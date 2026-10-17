const jobs = [
  ["st-johns", ["St John's Co-Cathedral, Valletta", "Kon-Katidral ta San Gwann, Valletta"]],
  ["lower-barrakka", ["Lower Barrakka Gardens, Valletta", "Gnien Barrakka t Isfel, Valletta"]],
  ["siege-bell", ["Siege Bell Memorial, Valletta", "Siege Bell, Valletta"]],
  ["hastings", ["Hastings Gardens, Valletta", "Gnien Hastings, Valletta"]],
  ["hagar", ["Hagar Qim, Qrendi", "Hagar Qim Temples"]],
  ["mnajdra", ["Mnajdra, Qrendi", "Mnajdra Temples Malta"]],
  ["skorba", ["Skorba Temples, Mgarr, Malta", "Skorba, Zebbiegh"]],
  ["stpeters", ["St Peter's Pool, Delimara", "Peters Pool Malta"]],
  ["clapham", ["Misrah Ghar il-Kbir, Dingli", "Clapham Junction cart ruts Malta"]],
  ["spinola", ["Spinola Bay, St Julian's, Malta", "Spinola Bay Malta"]],
  ["red-tower", ["Saint Agatha's Tower, Mellieha", "Red Tower Marfa Malta"]],
  ["mgarr", ["Mgarr Harbour, Gozo", "Mgarr ferry terminal Gozo"]],
  ["xlendi", ["Xlendi Bay, Gozo", "Xlendi Gozo"]],
  ["dwejra", ["Dwejra Bay, San Lawrenz, Gozo", "Dwejra Gozo"]],
  ["tapinu", ["Ta Pinu Basilica, Gozo", "Ta' Pinu Sanctuary Gozo"]],
  ["qala", ["Qala Belvedere, Gozo", "Qala Gozo viewpoint"]],
  ["comino-tower", ["St Mary's Tower, Comino", "Santa Marija Tower Comino"]],
  ["ghar-dalam", ["Ghar Dalam Museum, Birzebbuga", "Ghar Dalam Cave Birzebbuga"]],
  ["mielah", ["Wied il-Mielah Window, Gozo", "Wied il-Mielah Gharb"]],
  ["mdina-gate", ["Mdina Gate, Malta", "Main Gate Mdina"]],
  ["st-pauls-bay", ["St Paul's Bay, Malta", "San Pawl il-Bahar"]],
  ["tacenc", ["Ta Cenc Cliffs, Sannat, Gozo", "Ta' Cenc Gozo"]],
  ["azure", ["Azure Window, Dwejra, Gozo", "Dwejra Point Gozo"]],
];

const out = [];
for (const [id, queries] of jobs) {
  let hit = null;
  for (const q of queries) {
    const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=" + encodeURIComponent(q);
    const res = await fetch(url, {
      headers: {
        "User-Agent": "przewodnik-na-ucho/1.0 (personal travel app)",
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
fs.writeFileSync("coords-missing.json", JSON.stringify(out, null, 2));
console.log("DONE", out.length);
