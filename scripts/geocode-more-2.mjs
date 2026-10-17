const jobs = [
  ["carmelite", ["Basilica of Our Lady of Mount Carmel, Valletta", "Karmnu Valletta"]],
  ["birkirkara", ["Basilica of Saint Helen, Birkirkara", "Santa Liena Birkirkara"]],
  ["lucian", ["Torri San Lucjan, Marsaxlokk", "Saint Lucian Tower Marsaxlokk"]],
  ["sanblas", ["San Blas Bay, Nadur, Gozo", "Ramla ta' San Blas"]],
  ["xlendi-tower", ["Xlendi Tower, Gozo", "Torri ta' Xlendi"]],
  ["santa-marija", ["Santa Marija Chapel, Comino", "St Mary's Chapel Comino"]],
  ["xaghra", ["Xaghra Parish Church, Gozo", "Basilica of the Nativity of Our Lady Xaghra"]],
  ["delimara-light", ["Delimara Lighthouse, Marsaxlokk"]],
  ["st-thomas-tower", ["St Thomas Tower, Marsaskala"]],
];
const out = [];
for (const [id, queries] of jobs) {
  let hit = null;
  for (const q of queries) {
    const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=" + encodeURIComponent(q);
    const res = await fetch(url, {
      headers: { "User-Agent": "malta-na-ucho-personal-guide/1.0 (personal travel app)", "Accept-Language": "en" },
    });
    const data = res.ok ? await res.json() : [];
    hit = data.find((item) => {
      const lat = Number(item.lat);
      const lng = Number(item.lon);
      return lat > 35.78 && lat < 36.09 && lng > 14.18 && lng < 14.6;
    });
    if (hit) break;
    await new Promise((r) => setTimeout(r, 1100));
  }
  if (!hit) {
    console.log(id, "NONE");
    out.push({ id, error: "none" });
  } else {
    console.log(id, Number(hit.lat).toFixed(6) + "," + Number(hit.lon).toFixed(6), "|", hit.display_name.split(",").slice(0, 3).join(","));
    out.push({ id, lat: Number(Number(hit.lat).toFixed(6)), lng: Number(Number(hit.lon).toFixed(6)), name: hit.display_name.split(",").slice(0, 3).join(",").trim() });
  }
  await new Promise((r) => setTimeout(r, 1100));
}
import fs from "node:fs";
fs.writeFileSync("coords-more-2.json", JSON.stringify(out, null, 2));
console.log("DONE", out.length);
