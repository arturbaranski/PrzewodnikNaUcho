import fs from "node:fs";

const jobs = [
  ["zamek", "Zamek Książąt Pomorskich, Szczecin"],
  ["waly", "Wały Chrobrego, Szczecin"],
  ["filharmonia", "Filharmonia im. Mieczysława Karłowicza, Szczecin"],
  ["jakub", "Bazylika archikatedralna św. Jakuba, Szczecin"],
  ["portowa", "Brama Portowa, Szczecin"],
  ["piotr", "Kościół św. Piotra i Pawła, Szczecin"],
  ["orzel", "Plac Orła Białego, Szczecin"],
  ["ratusz", "Ratusz Staromiejski, Szczecin"],
  ["przelomy", "Centrum Dialogu Przełomy, Szczecin"],
  ["aniol", "Pomnik Anioła Wolności, Szczecin"],
  ["blonia", "Jasne Błonia, Szczecin"],
  ["czyn", "Pomnik Czynu Polaków, Szczecin"],
  ["rozanka", "Różanka, Szczecin"],
  ["cmentarz", "Cmentarz Centralny, Szczecin"],
  ["technika", "Muzeum Techniki i Komunikacji, Szczecin"],
  ["lentz", "Willa Lentza, Szczecin"],
  ["szmaragd", "Jezioro Szmaragdowe, Szczecin"],
  ["nauka", "Morskie Centrum Nauki, Szczecin"],
  ["jan", "Bazylika św. Jana Chrzciciela, Szczecin"],
  ["krolewska", "Brama Królewska, Szczecin"],
  ["globus", "Pałac pod Globusem, Szczecin"],
];

const out = [];
for (const [id, q] of jobs) {
  const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" + encodeURIComponent(q);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "przewodnik-na-ucho/1.0 (personal travel app)",
      "Accept-Language": "pl",
    },
  });
  if (!res.ok) {
    console.log(id, "FAIL", res.status);
    out.push({ id, q, error: res.status });
  } else {
    const data = await res.json();
    const hit = data[0];
    if (!hit) {
      console.log(id, "NONE");
      out.push({ id, q, error: "none" });
    } else {
      const lat = Number(Number(hit.lat).toFixed(6));
      const lng = Number(Number(hit.lon).toFixed(6));
      const name = hit.display_name.split(",").slice(0, 4).join(",").trim();
      const ok = lat > 53.33 && lat < 53.52 && lng > 14.45 && lng < 14.75;
      console.log(id, `${lat},${lng}`, ok ? "" : "OUT", "|", name);
      out.push({ id, lat, lng, name, ok, kind: hit.type, category: hit.category });
    }
  }
  await new Promise((r) => setTimeout(r, 1100));
}
fs.writeFileSync("coords-szczecin.json", JSON.stringify(out, null, 2));
console.log("DONE", out.length);
