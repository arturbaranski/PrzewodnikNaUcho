import fs from "node:fs";

const jobs = [
  ["piotrkowska", "Piotrkowska 100, Łódź"],
  ["wolnosci", "Plac Wolności, Łódź"],
  ["rozy", "Pasaż Róży, Łódź"],
  ["tuwim", "Ławeczka Tuwima, Łódź"],
  ["rubinstein", "Fortepian Rubinsteina, Piotrkowska, Łódź"],
  ["off", "OFF Piotrkowska, Łódź"],
  ["manufaktura", "Manufaktura, Łódź"],
  ["palac", "Pałac Izraela Poznańskiego, Łódź"],
  ["ms2", "ms2 Muzeum Sztuki, Łódź"],
  ["biala", "Centralne Muzeum Włókiennictwa, Łódź"],
  ["ksiezy", "Księży Młyn, Łódź"],
  ["herbst", "Pałac Herbsta, Łódź"],
  ["ec1", "EC1 Łódź"],
  ["fabryczna", "Dworzec Łódź Fabryczna"],
  ["zrodliska", "Palmiarnia, Park Źródliska, Łódź"],
  ["katedra", "Bazylika archikatedralna św. Stanisława Kostki, Łódź"],
  ["cmentarz", "Cmentarz Żydowski, ul. Bracka, Łódź"],
  ["radegast", "Stacja Radegast, Łódź"],
  ["baluty", "Bałucki Rynek, Łódź"],
  ["filmowka", "Szkoła Filmowa, Targowa, Łódź"],
  ["kino", "Muzeum Kinematografii, Łódź"],
  ["stary", "Stary Rynek, Łódź"],
  ["orientarium", "Orientarium, Zoo, Łódź"],
];

const out = [];
for (const [id, q] of jobs) {
  const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" + encodeURIComponent(q);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "malta-na-ucho-personal-guide/1.0 (personal travel app)",
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
      const name = hit.display_name.split(",").slice(0, 3).join(",").trim();
      const ok = lat > 51.7 && lat < 51.86 && lng > 19.3 && lng < 19.6;
      console.log(id, `${lat},${lng}`, ok ? "" : "OUT", "|", name);
      out.push({ id, lat, lng, name, ok });
    }
  }
  await new Promise((r) => setTimeout(r, 1100));
}
fs.writeFileSync("coords-lodz.json", JSON.stringify(out, null, 2));
console.log("DONE", out.length);
