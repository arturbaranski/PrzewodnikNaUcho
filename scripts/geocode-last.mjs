const jobs = [
  ["hastings", ["Gnien Hastings Valletta", "Hastings Gardens Valletta Malta"]],
  ["red-tower", ["Torri ta Sant Agata Mellieha", "Red Tower Marfa Malta", "Saint Agatha Tower Mellieha"]],
  ["qala", ["Qala Belvedere Gozo", "Il-Belveder Qala", "Qala parish church Gozo"]],
  ["lower-barrakka", ["Lower Barrakka Gardens Valletta", "Il-Barrakka t'Isfel Valletta", "Lower Barracca Valletta"]],
  ["stpeters", ["St Peter's Pool Delimara Malta", "Peters Pool Marsaxlokk"]],
  ["clapham", ["Misrah Ghar il-Kbir Malta", "Clapham Junction Dingli cart ruts"]],
];

const out = [];
for (const [id, queries] of jobs) {
  let hit = null;
  for (const q of queries) {
    const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=" + encodeURIComponent(q);
    const res = await fetch(url, {
      headers: {
        "User-Agent": "malta-na-ucho-personal-guide/1.0 (personal travel app)",
        "Accept-Language": "en",
      },
    });
    const data = res.ok ? await res.json() : [];
    hit = data.find((item) => {
      const lat = Number(item.lat);
      const lng = Number(item.lon);
      return lat > 35.78 && lat < 36.09 && lng > 14.18 && lng < 14.6;
    });
    if (hit) break;
    await new Promise((resolve) => setTimeout(resolve, 1100));
  }
  if (!hit) {
    console.log(id, "NONE");
    out.push({ id, error: "none" });
  } else {
    const row = {
      id,
      lat: Number(Number(hit.lat).toFixed(6)),
      lng: Number(Number(hit.lon).toFixed(6)),
      name: hit.display_name.split(",").slice(0, 3).join(",").trim(),
    };
    out.push(row);
    console.log(id, row.lat + "," + row.lng, "|", row.name);
  }
  await new Promise((resolve) => setTimeout(resolve, 1100));
}
import fs from "node:fs";
fs.writeFileSync("coords-last.json", JSON.stringify(out, null, 2));
console.log("DONE");
