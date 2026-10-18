import { readFileSync, writeFileSync } from "node:fs";
import { PLACES } from "../js/places.js";
import { distanceMeters } from "../js/engine.js";

const fresh = JSON.parse(readFileSync(new URL("../coords-malta-more.json", import.meta.url), "utf8"))
  .filter((row) => !row.error);

const accepted = PLACES.map((place) => ({ ...place }));
const kept = [];
const dropped = [];

const ranked = fresh
  .map((row) => {
    let nearest = Infinity;
    for (const other of accepted) {
      nearest = Math.min(nearest, distanceMeters(row.lat, row.lng, other.lat, other.lng));
    }
    return { ...row, nearest };
  })
  .sort((a, b) => b.nearest - a.nearest);

for (const row of ranked) {
  let room = 90;
  for (const other of accepted) {
    const distance = distanceMeters(row.lat, row.lng, other.lat, other.lng);
    room = Math.min(room, distance - other.radius + 20);
  }
  const radius = Math.floor(room);
  if (radius < 30) {
    dropped.push({ id: row.id, nearest: Math.round(row.nearest), room: Math.round(room) });
    continue;
  }
  const place = { ...row, radius: Math.min(radius, 90) };
  accepted.push(place);
  kept.push(place);
}

writeFileSync(new URL("../coords-malta-kept.json", import.meta.url), JSON.stringify(kept, null, 2));
console.log("existing", PLACES.length);
console.log("geocoded", fresh.length);
console.log("kept", kept.length);
console.log("total", PLACES.length + kept.length);
console.log("dropped", dropped.length);
console.log(dropped.map((row) => row.id).join(" "));
