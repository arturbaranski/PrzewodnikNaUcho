import { readFileSync, writeFileSync } from "node:fs";
import { PLACES } from "../js/places.js";
import { distanceMeters } from "../js/engine.js";

const kept = JSON.parse(readFileSync(new URL("../coords-malta-kept.json", import.meta.url), "utf8"));
const drop = new Set(["kuncizzjoni", "luqa-runway", "ramla-sand"]);
const rename = {
  "safi-aviation": { id: "safi", name: "Safi" },
  qawra: { id: "qawra-tower", name: "Wieża Qawra" },
  "santa-lucija-gozo": { id: "kercem", name: "Kerċem" },
  "marsa-racecourse": { id: "marsamxett", name: "Port Marsamxett" },
  "hamrun-station": { id: "hamrun", name: "Ħamrun" },
  "naxxar-palazzo": { id: "targa-square", name: "San Pawl tat-Tarġa" },
  imgiebah: { id: "mistra-bay", name: "Zatoka Mistra" },
  mistra: { id: "mistra-valley", name: "Dolina Mistra" },
  "ramla-bay": { id: "ramla-tal-bir", name: "Ramla tal-Bir" },
  qhira: { id: "qawra-promenade", name: "Promenada Qawra" },
  "comino-pig": { id: "comino-walk", name: "Wnętrze Comino" },
  benghajsa: { name: "Fort Bengħajsa" },
  "paul-islands": { name: "Wyspy św. Pawła" },
  cominotto: { name: "Cominotto" },
  airport: { name: "Lotnisko Malty" },
};

const base = kept.filter((place) => !drop.has(place.id)).map((place) => {
  const next = rename[place.id] || {};
  return {
    id: next.id || place.id,
    name: next.name || place.name,
    area: place.area,
    island: place.island,
    lat: place.lat,
    lng: place.lng,
    radius: Math.min(70, place.radius),
  };
});

const extra = [
  ["kenuna", "Wieża Ta' Kenuna", "Gozo", "gozo", 36.03564, 14.28395],
  ["laferla", "Krzyż Laferla", "Południe", "malta", 35.85025, 14.41666],
  ["sanap", "Klify Sanap", "Gozo", "gozo", 36.02186, 14.22647],
  ["kelinu", "Muzeum Kelinu Grimy", "Gozo", "gozo", 36.03718, 14.29313],
  ["mixta", "Jaskinia Mixta", "Gozo", "gozo", 36.06334, 14.28942],
  ["qolla-safra", "Qolla s-Safra", "Gozo", "gozo", 36.07351, 14.25506],
  ["qolla-bajda", "Qolla l-Bajda", "Gozo", "gozo", 36.07966, 14.24979],
  ["ras-wardija", "Ras il-Wardija", "Gozo", "gozo", 36.03657, 14.18712],
  ["ramla-villa", "Willa rzymska na Ramli", "Gozo", "gozo", 36.06126, 14.28297],
  ["bir-mula", "Bir Mula Heritage", "Trzy Miasta", "malta", 35.883, 14.52367],
  ["widna", "Il-Widna", "Północ", "malta", 35.93103, 14.44365],
  ["ginwi", "Świątynia Ħal Ġinwi", "Prehistoria", "malta", 35.84837, 14.54727],
  ["kennedy", "Gaj Kennedy'ego", "Północ", "malta", 35.94429, 14.41912],
  ["xarolla", "Wiatrak Xarolla", "Południe", "malta", 35.83181, 14.48068],
  ["ghar-rih-gozo", "Jaskinia ir-Riħ", "Gozo", "gozo", 36.08108, 14.23008],
  ["kalanka", "Kalanka", "Południe", "malta", 35.82381, 14.56042],
  ["filfla", "Filfla", "Południe", "malta", 35.78722, 14.41054],
  ["san-salvatore", "Fort św. Salwatora", "Trzy Miasta", "malta", 35.88607, 14.5284],
  ["xlendi-salt", "Saliny Xlendi", "Gozo", "gozo", 36.02762, 14.21251],
  ["fort-verdala", "Fort Verdala", "Trzy Miasta", "malta", 35.88061, 14.52409],
  ["nadur-tower", "Wieża Nadur", "Północ", "malta", 35.90059, 14.37117],
  ["qalet-marku", "Wieża Qalet Marku", "Północ", "malta", 35.9465, 14.45328],
  ["ghallis", "Wieża Għallis", "Północ", "malta", 35.95327, 14.43444],
  ["wardija-tower", "Wieża Wardija", "Południe", "malta", 35.8193, 14.4731],
  ["ramla-tat-torri", "Ramla tat-Torri", "Północ", "malta", 35.99241, 14.36534],
  ["white-tower", "Biała Wieża", "Północ", "malta", 35.99549, 14.36449],
  ["romeo-romano", "Ogrody Romeo Romano", "Centrum", "malta", 35.89013, 14.4774],
  ["fort-delimara", "Fort Delimara", "Południe", "malta", 35.82405, 14.55733],
  ["fort-pembroke", "Fort Pembroke", "Północ", "malta", 35.92708, 14.48096],
  ["tas-silg", "Tas-Silġ", "Prehistoria", "malta", 35.84584, 14.55183],
  ["australia-hall", "Australia Hall", "Północ", "malta", 35.92566, 14.47473],
  ["san-leonardu", "Fort św. Leonarda", "Południe", "malta", 35.87809, 14.55944],
  ["santu-rokku", "Fort św. Rocha", "Trzy Miasta", "malta", 35.89258, 14.53778],
  ["little-armier", "Mały Armier", "Północ", "malta", 35.98957, 14.35925],
  ["paradise-bay", "Paradise Bay", "Północ", "malta", 35.987, 14.33095],
  ["limestone", "Limestone Heritage", "Południe", "malta", 35.85284, 14.44252],
  ["santa-marija-bay", "Zatoka Santa Marija", "Comino", "comino", 36.01724, 14.33717],
  ["san-niklaw", "Zatoka San Niklaw", "Comino", "comino", 36.01786, 14.33011],
  ["ta-ghammar", "Ta' Għammar", "Gozo", "gozo", 36.05894, 14.21996],
  ["san-dimitri", "Przylądek San Dimitri", "Gozo", "gozo", 36.07407, 14.18474],
  ["spencer-garden", "Ogród Spencera", "Centrum", "malta", 35.88619, 14.49718],
  ["targa-ruts", "Koleiny na Targa", "Północ", "malta", 35.91937, 14.42573],
  ["salib-rajt", "Krzyż Rajt ma Rajtx", "Centrum", "malta", 35.90258, 14.4728],
  ["wied-musa", "Wied Musa", "Północ", "malta", 35.98611, 14.33803],
  ["dingli-cliffs", "Klify Dingli", "Południe", "malta", 35.84707, 14.3879],
  ["fort-campbell", "Fort Campbell", "Północ", "malta", 35.96326, 14.39091],
  ["simar", "Rezerwat Simar", "Północ", "malta", 35.94572, 14.38238],
  ["salina", "Saliny Salina", "Północ", "malta", 35.94605, 14.42317],
  ["ghajn-hadid", "Wieża Għajn Ħadid", "Północ", "malta", 35.96778, 14.38509],
  ["hamrija", "Wieża Ħamrija", "Południe", "malta", 35.8245, 14.43992],
  ["wiesgha", "Wieża Triq il-Wiesgħa", "Południe", "malta", 35.87797, 14.5642],
  ["st-thomas-tower", "Wieża św. Tomasza", "Południe", "malta", 35.8612, 14.57253],
  ["xrobb-tower", "Wieża Xrobb l-Għaġin", "Południe", "malta", 35.8411, 14.57126],
  ["madliena-tower", "Wieża Madliena", "Północ", "malta", 35.93654, 14.47306],
  ["ghajn-tuffieha-tower", "Wieża Għajn Tuffieħa", "Północ", "malta", 35.93086, 14.34334],
  ["ghajn-znuber", "Wieża Għajn Żnuber", "Północ", "malta", 35.95004, 14.34336],
  ["st-julian-tower", "Wieża św. Juliana", "Północ", "malta", 35.9178, 14.49919],
  ["wilga", "Wieża Wilġa", "Południe", "malta", 35.84975, 14.45957],
  ["bakkari", "Wieża Bakkari", "Południe", "malta", 35.81946, 14.49619],
  ["lija-belvedere", "Belweder w Lii", "Centrum", "malta", 35.90196, 14.44872],
  ["auberge-birgu", "Oberża Kastylii w Birgu", "Trzy Miasta", "malta", 35.8884, 14.52346],
  ["auberge-provence-birgu", "Oberża Prowansji w Birgu", "Trzy Miasta", "malta", 35.88846, 14.52258],
  ["cieda", "Wieża Ta' Ċieda", "Północ", "malta", 35.90736, 14.48006],
  ["captain-tower", "Wieża Kapitana", "Północ", "malta", 35.92068, 14.44245],
  ["wardija-battery", "Bateria Wardija", "Północ", "malta", 35.94367, 14.40008],
  ["ghawhar", "Wieża Ġawhar", "Południe", "malta", 35.83279, 14.4995],
  ["santi-tower", "Wieża tas-Santi", "Północ", "malta", 35.89761, 14.35735],
  ["st-thomas-battery", "Bateria św. Tomasza", "Południe", "malta", 35.86117, 14.57296],
];

function roomFor(lat, lng, list) {
  let room = 70;
  for (const other of list) {
    room = Math.min(room, distanceMeters(lat, lng, other.lat, other.lng) - other.radius + 20);
  }
  return room;
}

const blocked = [...PLACES, ...base];
const accepted = [];
const rejected = [];
for (const row of extra) {
  const place = { id: row[0], name: row[1], area: row[2], island: row[3], lat: row[4], lng: row[5] };
  if (place.lat <= 35.78 || place.lat >= 36.09 || place.lng <= 14.18 || place.lng >= 14.6) {
    rejected.push(`${place.id} bounds`);
    continue;
  }
  const room = roomFor(place.lat, place.lng, [...blocked, ...accepted]);
  if (room < 30) {
    rejected.push(`${place.id} room ${Math.floor(room)}`);
    continue;
  }
  place.radius = Math.floor(room);
  accepted.push(place);
}

const all = [...base, ...accepted];
writeFileSync(new URL("../coords-malta-final.json", import.meta.url), JSON.stringify(all, null, 2));
console.log("base", base.length, "accepted", accepted.length, "totalWithOld", PLACES.length + all.length);
console.log("REJECTED");
console.log(rejected.join("\n"));
