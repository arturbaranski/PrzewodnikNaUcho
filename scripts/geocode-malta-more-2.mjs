const jobs = [
  ["hal-millieri", "Południe", "malta", "Kaplica Ħal Millieri", ["Hal Millieri Chapel Malta", "Hal Millieri Zurrieq"]],
  ["laferla", "Południe", "malta", "Krzyż Laferla", ["Laferla Cross Siggiewi", "Laferla Cross Malta"]],
  ["providenza", "Południe", "malta", "Tal-Providenza", ["Tal-Providenza Siggiewi", "Tal-Providenza Malta"]],
  ["fort-delimara", "Południe", "malta", "Fort Delimara", ["Fort Delimara Malta"]],
  ["kalanka", "Południe", "malta", "Kalanka", ["Il-Kalanka Delimara", "Kalanka Bay Malta"]],
  ["wied-babu", "Południe", "malta", "Wied Babu", ["Wied Babu Zurrieq", "Wied Babu Malta"]],
  ["bubaqra", "Południe", "malta", "Bubaqra", ["Bubaqra Malta", "Bubaqra Zurrieq"]],
  ["fawwara", "Południe", "malta", "Fawwara", ["Fawwara Malta", "Fawwara Siggiewi"]],
  ["qrendi", "Południe", "malta", "Qrendi", ["Qrendi Malta"]],
  ["gharghur", "Centrum", "malta", "Għargħur", ["Gharghur Malta"]],
  ["hamrun", "Centrum", "malta", "Ħamrun", ["Hamrun Malta"]],
  ["pieta", "Centrum", "malta", "Pietà", ["Pieta Malta"]],
  ["dingli-village", "Południe", "malta", "Dingli", ["Dingli Malta"]],
  ["nadur", "Gozo", "gozo", "Nadur", ["Nadur Gozo"]],
  ["san-dimitri", "Gozo", "gozo", "Kaplica św. Dymitra", ["San Dimitri Gozo", "San Dimitri Gharb"]],
  ["ghasri-village", "Gozo", "gozo", "Għasri", ["Ghasri Gozo"]],
  ["sannat", "Gozo", "gozo", "Sannat", ["Sannat Gozo"]],
  ["xwejni", "Gozo", "gozo", "Xwejni", ["Xwejni Gozo", "Xwejni Bay"]],
  ["san-blas", "Gozo", "gozo", "Zatoka San Blas", ["San Blas Gozo", "San Blas Bay"]],
  ["santa-marija-chapel", "Comino", "comino", "Kaplica św. Marii", ["Santa Marija Chapel Comino", "Santa Marija Comino"]],
  ["kenuna", "Gozo", "gozo", "Wieża Kenuna", ["Kenuna Tower Nadur", "Kenuna Tower Gozo"]],
  ["qala-village", "Gozo", "gozo", "Qala", ["Qala Gozo"]],
  ["salina", "Północ", "malta", "Saliny", ["Salina Malta", "Salina Bay"]],
  ["kennedy-grove", "Północ", "malta", "Kennedy Grove", ["Kennedy Grove Malta", "Kennedy Grove Salina"]],
  ["paradise-bay", "Północ", "malta", "Paradise Bay", ["Paradise Bay Malta"]],
  ["ahrax", "Północ", "malta", "Wieża Ahrax", ["Ahrax Tower Malta", "Ahrax Mellieha"]],
  ["ghajn-tower", "Północ", "malta", "Wieża Ġajn Tuffieħa", ["Ghajn Tuffieha Tower Malta"]],
  ["st-thomas-tower", "Południe", "malta", "Wieża św. Tomasza", ["Saint Thomas Tower Malta", "St Thomas Tower Marsaskala"]],
  ["zabbar", "Południe", "malta", "Żabbar", ["Zabbar Malta"]],
  ["kordin", "Prehistoria", "malta", "Świątynie Kordin", ["Kordin Malta", "Kordin III"]],
  ["kalkara", "Trzy Miasta", "malta", "Kalkara", ["Kalkara Malta"]],
  ["notre-dame", "Południe", "malta", "Brama Notre Dame", ["Notre Dame Gate Zabbar", "Notre Dame Gate Malta"]],
  ["peters-pool", "Południe", "malta", "Peter's Pool", ["Peters Pool Malta", "Peter's Pool Delimara"]],
  ["ghar-kbir", "Południe", "malta", "Għar il-Kbir", ["Ghar il-Kbir Malta", "Ghar il-Kbir Dingli"]],
  ["ras-qammieh", "Północ", "malta", "Ras il-Qammieħ", ["Ras il-Qammieh Malta", "Qammieh Mellieha"]],
  ["migra", "Północ", "malta", "Miġra l-Ferħa", ["Migra l-Ferha Malta", "Migra Ferha"]],
  ["stadium", "Centrum", "malta", "Stadion narodowy", ["National Stadium Ta Qali", "Ta' Qali Stadium"]],
  ["romano", "Centrum", "malta", "Ogrody Romeo Romano", ["Romeo Romano Gardens Santa Venera"]],
  ["limestone", "Południe", "malta", "Limestone Heritage", ["Limestone Heritage Siggiewi", "Limestone Heritage Malta"]],
  ["ghammar", "Gozo", "gozo", "Wzgórze Ta' Għammar", ["Ta' Ghammar Gozo", "Ta Ghammar Hill"]],
  ["hamrija", "Południe", "malta", "Wieża Ħamrija", ["Hamrija Tower Malta", "Torri Hamrija"]],
  ["ghallis", "Północ", "malta", "Wieża Għallis", ["Ghallis Tower Malta", "Ghallis Tower Salina"]],
  ["qalet-marku", "Północ", "malta", "Wieża Qalet Marku", ["Qalet Marku Tower", "St Mark's Tower Malta"]],
  ["xutu", "Południe", "malta", "Wieża Xutu", ["Xutu Tower Malta", "Sciutu Tower Wied iz-Zurrieq"]],
  ["wardija-tower", "Północ", "malta", "Wieża Wardija", ["Wardija Tower Malta"]],
  ["benghajsa-tower", "Południe", "malta", "Wieża Bengħajsa", ["Benghajsa Tower", "Benghisa Tower Malta"]],
  ["triqu-wiesgha", "Północ", "malta", "Wieża Triq il-Wiesgħa", ["Triq il-Wiesgha Tower", "Armier Tower Malta"]],
  ["madliena-tower", "Północ", "malta", "Wieża Madliena", ["Madliena Tower Malta"]],
  ["st-george-tower", "Północ", "malta", "Wieża św. Jerzego", ["St George's Tower St Julian's"]],
  ["ortiz", "Północ", "malta", "Bateria św. Jerzego", ["St George's Battery Malta"]],
  ["mellieha-statue", "Północ", "malta", "Statua w Mellieħy", ["Mellieha statue", "Our Lady of Mellieha statue"]],
  ["red-tower-road", "Północ", "malta", "Marfa", ["Marfa Malta"]],
  ["little-armier", "Północ", "malta", "Little Armier", ["Little Armier Malta"]],
  ["cirkewwa-paradise", "Północ", "malta", "Paradise Bay", ["Paradise Bay Cirkewwa"]],
  ["selmun-palace-view", "Północ", "malta", "Pałac Selmun", ["Selmun Palace Malta"]],
  ["mgarr-egg", "Północ", "malta", "Kościół-jajko", ["Mgarr Malta"]],
  ["zebbieh", "Północ", "malta", "Żebbiegħ", ["Zebbieh Malta", "Zebbiegh Mgarr"]],
  ["ta-hagrat-village", "Północ", "malta", "Mġarr", ["Mgarr village Malta"]],
  ["naxxar-town", "Centrum", "malta", "Naxxar", ["Naxxar Malta"]],
  ["attard-town", "Centrum", "malta", "Attard", ["Attard Malta"]],
  ["balzan-town", "Centrum", "malta", "Balzan", ["Balzan Malta"]],
  ["lija-town", "Centrum", "malta", "Lija", ["Lija Malta"]],
  ["iklin", "Centrum", "malta", "Iklin", ["Iklin Malta"]],
  ["swatar", "Centrum", "malta", "Swatar", ["Swatar Malta"]],
  ["fleur", "Centrum", "malta", "Fleur-de-Lys", ["Fleur-de-Lys Malta"]],
  ["qormi", "Centrum", "malta", "Qormi", ["Qormi Malta"]],
  ["marsa-town", "Centrum", "malta", "Marsa", ["Marsa Malta"]],
  ["paola-town", "Południe", "malta", "Paola", ["Paola Malta"]],
  ["fgura-town", "Południe", "malta", "Fgura", ["Fgura Malta"]],
  ["ghaxaq", "Południe", "malta", "Għaxaq", ["Ghaxaq Malta"]],
  ["safi-town", "Południe", "malta", "Safi", ["Safi Malta"]],
  ["mqabba-town", "Południe", "malta", "Mqabba", ["Mqabba Malta"]],
  ["qrendi-town", "Południe", "malta", "Qrendi", ["Qrendi"]],
  ["zurrieq-town", "Południe", "malta", "Żurrieq", ["Zurrieq Malta"]],
  ["siggiewi-town", "Południe", "malta", "Siġġiewi", ["Siggiewi Malta"]],
  ["kirkop-town", "Południe", "malta", "Kirkop", ["Kirkop Malta"]],
  ["gudja-town", "Południe", "malta", "Gudja", ["Gudja Malta"]],
  ["luqa-town", "Południe", "malta", "Luqa", ["Luqa Malta"]],
  ["xghajra-town", "Południe", "malta", "Xgħajra", ["Xghajra"]],
  ["marsaskala-town", "Południe", "malta", "Marsaskala", ["Marsaskala Malta"]],
  ["birzebbuga-town", "Południe", "malta", "Birżebbuġa", ["Birzebbuga Malta"]],
  ["kalkara-town", "Trzy Miasta", "malta", "Kalkara", ["Kalkara"]],
  ["senglea-town", "Trzy Miasta", "malta", "Senglea", ["Senglea Malta"]],
  ["cospicua-town", "Trzy Miasta", "malta", "Cospicua", ["Cospicua Malta"]],
  ["birgu-town", "Trzy Miasta", "malta", "Birgu", ["Birgu Malta"]],
  ["floriana-town", "Floriana", "malta", "Floriana", ["Floriana Malta"]],
  ["sliema-town", "Północ", "malta", "Sliema", ["Sliema Malta"]],
  ["stjulians-town", "Północ", "malta", "St Julian's", ["St Julian's Malta"]],
  ["gzira-town", "Północ", "malta", "Gżira", ["Gzira Malta"]],
  ["msida-town", "Centrum", "malta", "Msida", ["Msida Malta"]],
  ["pembroke-town", "Północ", "malta", "Pembroke", ["Pembroke"]],
  ["mellieha-town", "Północ", "malta", "Mellieħa", ["Mellieha Malta"]],
  ["mosta-town", "Centrum", "malta", "Mosta", ["Mosta Malta"]],
  ["rabat-town", "Mdina i Rabat", "malta", "Rabat", ["Rabat Malta"]],
  ["mdina-town", "Mdina i Rabat", "malta", "Mdina", ["Mdina Malta"]],
  ["gozo-nadur", "Gozo", "gozo", "Nadur", ["Nadur"]],
  ["gozo-xaghra", "Gozo", "gozo", "Xagħra", ["Xaghra Gozo"]],
  ["gozo-xewkija", "Gozo", "gozo", "Xewkija", ["Xewkija Gozo"]],
  ["gozo-qala", "Gozo", "gozo", "Qala", ["Qala"]],
  ["gozo-gharb", "Gozo", "gozo", "Għarb", ["Gharb Gozo"]],
  ["gozo-sannat", "Gozo", "gozo", "Sannat", ["Sannat"]],
  ["gozo-zebbug", "Gozo", "gozo", "Żebbuġ", ["Zebbug Gozo"]],
  ["gozo-victoria", "Gozo", "gozo", "Victoria", ["Victoria Gozo"]],
  ["gozo-xlendi", "Gozo", "gozo", "Xlendi", ["Xlendi Gozo"]],
  ["gozo-marsalforn", "Gozo", "gozo", "Marsalforn", ["Marsalforn Gozo"]],
  ["ta-cenc", "Gozo", "gozo", "Ta' Ċenċ", ["Ta Cenc Gozo", "Ta' Cenc Sannat"]],
  ["sanap", "Gozo", "gozo", "Klify Sanap", ["Sanap Cliffs Gozo"]],
  ["mgarr-xini", "Gozo", "gozo", "Mġarr ix-Xini", ["Mgarr ix-Xini Gozo"]],
  ["hondoq", "Gozo", "gozo", "Hondoq", ["Hondoq Gozo"]],
  ["ramla-gozo", "Gozo", "gozo", "Ramla", ["Ramla Gozo"]],
  ["dwejra-gozo", "Gozo", "gozo", "Dwejra", ["Dwejra Gozo"]],
  ["wied-mielah", "Gozo", "gozo", "Wied il-Mielaħ", ["Wied il-Mielah Gozo"]],
];

const out = [];
for (const [id, area, island, name, queries] of jobs) {
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
    await new Promise((resolve) => setTimeout(resolve, 1100));
    if (hit) break;
  }
  if (!hit) {
    console.log("NONE", id);
    out.push({ id, area, island, name, error: "none" });
  } else {
    out.push({
      id, area, island, name,
      lat: Number(Number(hit.lat).toFixed(6)),
      lng: Number(Number(hit.lon).toFixed(6)),
      label: hit.display_name.split(",").slice(0, 2).join(",").trim(),
    });
    console.log("OK", id, out.at(-1).lat, out.at(-1).lng);
  }
}
import { writeFileSync } from "node:fs";
writeFileSync(new URL("../coords-malta-more-2.json", import.meta.url), JSON.stringify(out, null, 2));
console.log("WROTE", out.length, "hits", out.filter((row) => !row.error).length);
