import { readFileSync, writeFileSync } from "node:fs";
import { PLACES } from "../js/places.js";
import { distanceMeters } from "../js/engine.js";

const kept = JSON.parse(readFileSync(new URL("../coords-malta-kept.json", import.meta.url), "utf8"));
const osm = JSON.parse(readFileSync(new URL("../coords-malta-osm.json", import.meta.url), "utf8"));
const drop = new Set(["kuncizzjoni", "luqa-runway", "ramla-sand"]);

const blocked = [
  ...PLACES,
  ...kept.filter((place) => !drop.has(place.id)).map((place) => ({ ...place, radius: Math.min(90, place.radius) })),
];

const junk = /wreck|dive|radar|viewing point|visitor terrace|statue|madonna|memorial|monument|artwork|cold war|fougasse|cart rut|dolmen|bathing pool|tunnel|sikka|racecourse|weather/i;
const goodKind = /tower|fort|chapel|church|cave|beach|bay|cliff|lighthouse|museum|palace|battery|temple|park|garden|bridge|archaeological|ruins|castle|peak|attraction|viewpoint/i;

function slug(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42);
}

function islandOf(lat, lng) {
  if (lat > 35.98 && lng < 14.36) return "comino";
  if (lat > 35.99) return "gozo";
  return "malta";
}

function areaOf(lat, lng, island) {
  if (island === "comino") return "Comino";
  if (island === "gozo") return "Gozo";
  if (lat > 35.9 && lng < 14.45) return "Północ";
  if (lat > 35.93) return "Północ";
  if (lng > 14.5 && lat < 35.89) return "Trzy Miasta";
  if (lat < 35.86) return "Południe";
  if (lng < 14.42) return "Północ";
  return "Centrum";
}

function roomFor(lat, lng, list) {
  let room = 90;
  for (const other of list) {
    const dist = distanceMeters(lat, lng, other.lat, other.lng);
    room = Math.min(room, dist - other.radius + 20);
  }
  return room;
}

const usedIds = new Set(blocked.map((place) => place.id));
const seen = new Set();
const candidates = [];

for (const el of osm.elements) {
  const lat = el.lat || el.center?.lat;
  const lng = el.lon || el.center?.lon;
  const name = el.tags?.name?.trim();
  if (!lat || !lng || !name) continue;
  if (lat <= 35.78 || lat >= 36.09 || lng <= 14.18 || lng >= 14.6) continue;
  const kind = el.tags.historic || el.tags.tourism || el.tags.natural || el.tags.man_made || el.tags.leisure || "";
  if (junk.test(name) || junk.test(kind)) continue;
  if (!goodKind.test(kind) && !goodKind.test(name)) continue;
  const key = name.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  const room = roomFor(lat, lng, blocked);
  if (room < 30) continue;
  candidates.push({
    name,
    kind,
    lat: +Number(lat).toFixed(6),
    lng: +Number(lng).toFixed(6),
    room,
    tags: el.tags,
  });
}

candidates.sort((a, b) => b.room - a.room || a.name.localeCompare(b.name));

const picked = [];
for (const candidate of candidates) {
  const room = roomFor(candidate.lat, candidate.lng, [...blocked, ...picked]);
  if (room < 30) continue;
  let id = `osm-${slug(candidate.name)}`;
  if (usedIds.has(id)) id = `${id}-${picked.length}`;
  usedIds.add(id);
  const island = islandOf(candidate.lat, candidate.lng);
  picked.push({
    id,
    name: candidate.name,
    kind: candidate.kind,
    area: areaOf(candidate.lat, candidate.lng, island),
    island: island === "comino" ? "comino" : island === "gozo" ? "gozo" : "malta",
    lat: candidate.lat,
    lng: candidate.lng,
    radius: Math.floor(Math.min(70, room)),
    denomination: candidate.tags.denomination || "",
    religion: candidate.tags.religion || "",
  });
  if (picked.length >= 90) break;
}

writeFileSync(new URL("../coords-malta-osm-kept.json", import.meta.url), JSON.stringify(picked, null, 2));
console.log("picked", picked.length, "total", blocked.length + picked.length);
for (const place of picked) {
  console.log(`${place.radius}\t${place.island}\t${place.area}\t${place.kind}\t${place.name}`);
}
