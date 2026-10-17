const query = `[out:json][timeout:50];
(
  nwr["name"~"Lower Barrakka|Hastings Gardens|Peter.s Pool|Agatha|Qala Belvedere|Ghar il-Kbir|Misrah"](35.78,14.18,36.09,14.60);
);
out center tags;`;

const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: { "User-Agent": "przewodnik-na-ucho/1.0" },
  body: query,
});
const text = await res.text();
if (!res.ok) {
  console.log("FAIL", res.status, text.slice(0, 300));
  process.exit(1);
}
const data = JSON.parse(text);
for (const el of data.elements) {
  const lat = el.lat || el.center?.lat;
  const lng = el.lon || el.center?.lon;
  const name = el.tags?.name || "";
  if (!lat) continue;
  console.log(`${name} | ${lat.toFixed(6)},${lng.toFixed(6)} | ${el.type}`);
}
console.log("COUNT", data.elements.length);
