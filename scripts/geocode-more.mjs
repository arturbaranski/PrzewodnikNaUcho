const jobs = [
  ["paul-shipwreck", ["St Paul's Shipwreck Church, Valletta", "San Pawl Naufragu Valletta"]],
  ["muza", ["MUZA Valletta", "Auberge d'Italie Valletta"]],
  ["infermeria", ["Mediterranean Conference Centre Valletta", "Sacra Infermeria Valletta"]],
  ["cavalier", ["St James Cavalier Valletta", "Spazju Kreattiv Valletta"]],
  ["library", ["National Library of Malta Valletta", "Bibliotheca Valletta"]],
  ["casa-rocca", ["Casa Rocca Piccola Valletta"]],
  ["carmelite", ["Our Lady of Mount Carmel Valletta", "Carmelite Church Valletta"]],
  ["victoria-gate", ["Victoria Gate Valletta"]],
  ["siege-monument", ["Great Siege Monument Valletta"]],
  ["bombes", ["Porte des Bombes Floriana"]],
  ["publius", ["St Publius Church Floriana"]],
  ["rinella", ["Fort Rinella Kalkara"]],
  ["helen-gate", ["St Helen Gate Cospicua", "Bormla Gate"]],
  ["lawrence", ["St Lawrence Church Birgu"]],
  ["falson", ["Palazzo Falson Mdina"]],
  ["natural-history", ["National Museum of Natural History Mdina"]],
  ["agatha", ["St Agatha Catacombs Rabat Malta"]],
  ["parisio", ["Palazzo Parisio Naxxar"]],
  ["birkirkara", ["St Helen Basilica Birkirkara"]],
  ["verdala", ["Verdala Palace Malta"]],
  ["aviation", ["Malta Aviation Museum Ta Qali"]],
  ["wignacourt-tower", ["Wignacourt Tower St Paul's Bay"]],
  ["mellieha-church", ["Mellieha Parish Church", "Sanctuary of Our Lady Mellieha"]],
  ["selmun", ["Selmun Palace Mellieha"]],
  ["bingemma", ["Bingemma Chapel Malta", "Victoria Lines Malta"]],
  ["delimara-light", ["Delimara Lighthouse Malta"]],
  ["marsaskala", ["Marsaskala Bay Malta", "St Thomas Tower Marsaskala"]],
  ["lapsi", ["Ghar Lapsi Malta"]],
  ["tassilg", ["Tas-Silg Malta", "Tas-Silg Marsaxlokk"]],
  ["lucian", ["St Lucian Tower Marsaxlokk"]],
  ["st-george-gozo", ["St George's Basilica Victoria Gozo"]],
  ["takola", ["Ta Kola Windmill Xaghra"]],
  ["chambray", ["Fort Chambray Gozo"]],
  ["lourdes-gozo", ["Our Lady of Lourdes Church Ghajnsielem"]],
  ["xini", ["Mgarr ix-Xini Gozo"]],
  ["sanblas", ["San Blas Bay Gozo"]],
  ["hondoq", ["Hondoq ir-Rummien Gozo"]],
  ["xlendi-tower", ["Xlendi Tower Gozo"]],
  ["qorrot", ["Dahlet Qorrot Gozo"]],
  ["santa-marija", ["Santa Marija Chapel Comino"]],
  ["ghasri-inlet", ["Wied il-Ghasri Gozo"]],
  ["xaghra", ["Xaghra Parish Church Gozo"]],
  ["madliena", ["Fort Madliena Malta"]],
  ["xemxija", ["Xemxija Heritage Trail", "Roman Baths Xemxija"]],
  ["pretty-bay", ["Pretty Bay Birzebbuga"]],
  ["borg-nadur", ["Borg in-Nadur Birzebbuga"]],
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
fs.writeFileSync("coords-more.json", JSON.stringify(out, null, 2));
console.log("DONE", out.length);
