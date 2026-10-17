import fs from "node:fs";

const query = `[out:json][timeout:90];
(
  nwr["leisure"~"park|garden|nature_reserve"]["name"](53.34,14.46,53.50,14.72);
  nwr["tourism"~"attraction|museum|viewpoint|gallery"]["name"](53.34,14.46,53.50,14.72);
  nwr["historic"]["name"](53.34,14.46,53.50,14.72);
  nwr["man_made"="tower"]["name"](53.34,14.46,53.50,14.72);
  nwr["bridge"="yes"]["name"](53.34,14.46,53.50,14.72);
  nwr["amenity"="place_of_worship"]["name"](53.34,14.46,53.50,14.72);
  nwr["natural"="water"]["name"](53.34,14.46,53.50,14.72);
  nwr["leisure"="beach_resort"]["name"](53.34,14.46,53.50,14.72);
);
out center tags;`;

const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: { "User-Agent": "przewodnik-na-ucho/1.0 (personal travel app)" },
  body: query,
});
const text = await res.text();
if (!res.ok) {
  console.log("FAIL", res.status, text.slice(0, 400));
  process.exit(1);
}
const data = JSON.parse(text);
const rows = [];
for (const el of data.elements) {
  const lat = el.lat || el.center?.lat;
  const lng = el.lon || el.center?.lon;
  if (!lat || !lng) continue;
  const tags = el.tags || {};
  rows.push({
    name: tags.name,
    lat: Number(lat.toFixed(6)),
    lng: Number(lng.toFixed(6)),
    kind: tags.tourism || tags.historic || tags.leisure || tags.amenity || tags.natural || (tags.bridge ? "bridge" : tags.man_made || ""),
    extra: tags["name:pl"] || "",
    wikidata: tags.wikidata || "",
    wikipedia: tags.wikipedia || "",
  });
}
fs.writeFileSync("coords-szczecin-osm.json", JSON.stringify(rows, null, 2));
console.log("COUNT", rows.length);
