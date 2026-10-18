import { writeFileSync } from "node:fs";

const query = `[out:json][timeout:90];
(
  nwr["historic"~"tower|fort|castle|church|chapel|monument|memorial|archaeological_site|ruins|city_gate|palace|monastery"](35.78,14.18,36.09,14.60);
  nwr["tourism"~"museum|gallery|attraction|viewpoint|artwork"](35.78,14.18,36.09,14.60);
  nwr["natural"~"beach|cave_entrance|cliff|bay|peak"](35.78,14.18,36.09,14.60);
  nwr["man_made"~"lighthouse|tower|bridge"](35.78,14.18,36.09,14.60);
  nwr["leisure"~"park|garden|nature_reserve"](35.78,14.18,36.09,14.60);
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
writeFileSync(new URL("../coords-malta-osm.json", import.meta.url), text);
const data = JSON.parse(text);
console.log("COUNT", data.elements.length);
