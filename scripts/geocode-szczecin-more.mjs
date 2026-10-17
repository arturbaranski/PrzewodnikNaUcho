import fs from "node:fs";

const jobs = [
  ["pionier", "Kino Pionier 1907, Szczecin"],
  ["ksiaznica", "Książnica Pomorska, Szczecin"],
  ["ratusz-nowy", "Urząd Miasta Szczecin"],
  ["teatr-polski", "Teatr Polski, Szczecin"],
  ["rzeznia", "Stara Rzeźnia, Szczecin"],
  ["ewa", "Elewator Ewa, Szczecin"],
  ["dworzec", "Dworzec Szczecin Główny"],
  ["stadion", "Stadion Miejski im. Floriana Krygiera, Szczecin"],
  ["arena", "Netto Arena, Szczecin"],
  ["grunwaldzki", "Plac Grunwaldzki, Szczecin"],
  ["zolnierza", "Plac Żołnierza Polskiego, Szczecin"],
  ["fontann", "Aleja Fontann, Szczecin"],
  ["dziewoklicz", "Plaża Dziewoklicz, Szczecin"],
  ["bulwar", "Bulwar Piastowski, Szczecin"],
  ["sienny", "Rynek Sienny, Szczecin"],
  ["letni", "Teatr Letni, Park Kasprowicza, Szczecin"],
  ["hanza", "Hanza Tower, Szczecin"],
  ["pazim", "Pazim, Szczecin"],
  ["uniwersytet", "Uniwersytet Szczeciński, rektorat"],
  ["dlugi", "Most Długi, Szczecin"],
  ["trafostacja", "Trafostacja Sztuki, Szczecin"],
  ["muze", "Klub 13 Muz, Szczecin"],
  ["poczta", "Poczta Główna, Szczecin"],
  ["stocznia", "Brama Stoczni Szczecińskiej"],
  ["boguslaw", "Ulica Księcia Bogusława X, Szczecin"],
  ["lotnikow", "Plac Lotników, Szczecin"],
  ["marina", "Marina, przystań jachtowa, Szczecin"],
  ["cisnien", "Wieża ciśnień, Szczecin"],
  ["gryf", "Bazylika św. Jana, Szczecin"],
];

const out = [];
for (const [id, q] of jobs) {
  const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" + encodeURIComponent(q);
  const res = await fetch(url, {
    headers: { "User-Agent": "przewodnik-na-ucho/1.0 (personal travel app)", "Accept-Language": "pl" },
  });
  const data = res.ok ? await res.json() : [];
  const hit = data[0];
  if (!hit) {
    console.log(id, "NONE");
    out.push({ id, q, error: "none" });
  } else {
    const lat = Number(Number(hit.lat).toFixed(6));
    const lng = Number(Number(hit.lon).toFixed(6));
    const name = hit.display_name.split(",").slice(0, 3).join(",").trim();
    const ok = lat > 53.33 && lat < 53.52 && lng > 14.45 && lng < 14.75;
    console.log(id, `${lat},${lng}`, ok ? "" : "OUT", "|", name);
    out.push({ id, lat, lng, name, ok });
  }
  await new Promise((r) => setTimeout(r, 1100));
}
fs.writeFileSync("coords-szczecin-more.json", JSON.stringify(out, null, 2));
console.log("DONE", out.length);
