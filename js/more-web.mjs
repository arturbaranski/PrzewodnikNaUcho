import { freshHistory, visitFacts } from "./more-palac.mjs";

const VISIT = "https://muzeum-lodz.pl/palac-rodziny-poznanskich-zaplanuj-wizyte/";
const CITY = { malta: "Malta", lodz: "Łódź", szczecin: "Szczecin" };
const GENERIC = new Set("plac ulica kosciol muzeum cmentarz teatr palac brama fort wyspa park rzeka most port rynek klasztor kaplica wieza ogrod bazylika kolegiata swiety swietego".split(" "));
const OTHER_CITIES = ["warszawa", "krakow", "gdansk", "wroclaw", "poznan", "bialystok", "lublin", "katowice"];
const BARE = new Set(["malta", "valletta", "gozo", "comino", "lodz", "szczecin"]);

function fold(value) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function hasWord(text, word) {
  return new RegExp(`(?:^|[^a-z0-9])${word}(?:[^a-z0-9]|$)`).test(text);
}

function tokenIn(token, folded) {
  if (folded.includes(token)) return true;
  if (token.length < 6) return false;
  const stem = token.slice(0, Math.max(6, token.length - 2));
  return folded.includes(stem);
}

function stem(token) {
  return token.length >= 6 ? token.slice(0, Math.max(6, token.length - 2)) : token;
}

function locationStems(city, area) {
  const aliases = {
    malta: ["malta", "valletta", "valletty", "gozo", "comino"],
    lodz: ["lodz", "lodzi"],
    szczecin: ["szczecin", "szczecina", "szczecinie"],
  };
  const names = [city, area, ...(aliases[fold(city)] || [])];
  return names.map((item) => stem(fold(item).replace(/[^a-z0-9]+/g, ""))).filter((item) => item.length >= 4);
}

function isLocationToken(token, stems) {
  const mine = stem(token);
  return stems.some((item) => item === mine || item.startsWith(mine) || mine.startsWith(item));
}

function titleScore(name, title, city, area) {
  const folded = fold(title);
  if (BARE.has(folded.replace(/[^a-z0-9]+/g, ""))) return 0;
  if (hasWord(folded, "ujednoznacznienie")) return 0;
  const ours = fold(city);
  if (OTHER_CITIES.some((item) => item !== ours && hasWord(folded, item))) return 0;
  const stems = locationStems(city, area);
  const all = fold(name).split(/[^a-z0-9]+/).filter((word) => word.length >= 4);
  const strong = all.filter((word) => !GENERIC.has(word) && !isLocationToken(word, stems));
  const weak = all.filter((word) => GENERIC.has(word));
  if (!strong.length && !weak.length) {
    const raw = fold(name).replace(/[^a-z0-9]+/g, "");
    return raw.length >= 3 && folded.replace(/[^a-z0-9]+/g, "").includes(raw) ? 3 : 0;
  }
  let score = 0;
  let nameHit = false;
  for (const token of strong) {
    if (!tokenIn(token, folded)) continue;
    score += token.length >= 7 ? 2 : 1;
    nameHit = true;
  }
  for (const token of weak) {
    if (!tokenIn(token, folded)) continue;
    score += 1;
    nameHit = true;
  }
  if (!nameHit) return 0;
  if (stems.some((item) => folded.includes(item))) score += 1;
  if (strong.length && strong.every((token) => tokenIn(token, folded))) score += 2;
  return score;
}

function requestHeaders() {
  const headers = { "Accept-Language": "pl" };
  if (typeof window === "undefined") headers["User-Agent"] = "przewodnik-na-ucho/1.0";
  return headers;
}

async function wikiQuery(params) {
  const url = `https://pl.wikipedia.org/w/api.php?${new URLSearchParams({ format: "json", ...params, origin: "*" })}`;
  let wait = 700;
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, {
      headers: requestHeaders(),
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 429 && attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, wait));
      wait *= 2;
      continue;
    }
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }
  throw new Error("429");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: requestHeaders(),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(String(response.status));
  return response.text();
}

function clip(text, max = 2200) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const end = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("! "), slice.lastIndexOf("? "));
  return (end > 400 ? slice.slice(0, end + 1) : slice).trim();
}

function wikiUrl(title) {
  return `https://pl.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
}

async function findTitle(place, city) {
  const radius = Math.min(700, Math.max(180, Math.round((place.radius || 40) * 5)));
  const [geoResult, searchResult] = await Promise.allSettled([
    wikiQuery({
      action: "query",
      list: "geosearch",
      gscoord: `${place.lat}|${place.lng}`,
      gsradius: String(radius),
      gslimit: "6",
    }),
    wikiQuery({
      action: "query",
      list: "search",
      srsearch: `${place.name} ${city}`,
      srlimit: "5",
    }),
  ]);
  if (geoResult.status === "rejected" && searchResult.status === "rejected") throw geoResult.reason;
  const geo = geoResult.status === "fulfilled" ? geoResult.value : {};
  const search = searchResult.status === "fulfilled" ? searchResult.value : {};
  const candidates = [];
  for (const hit of geo.query?.geosearch || []) {
    const score = titleScore(place.name, hit.title, city, place.area);
    if (score > 0) candidates.push({ title: hit.title, score: score + (hit.dist < 120 ? 1 : 0), dist: hit.dist });
  }
  for (const hit of search.query?.search || []) {
    const score = titleScore(place.name, hit.title, city, place.area);
    if (score > 0) candidates.push({ title: hit.title, score, dist: 9999 });
  }
  candidates.sort((a, b) => b.score - a.score || a.dist - b.dist);
  const seen = new Set();
  const ranked = [];
  for (const item of candidates) {
    if (seen.has(item.title)) continue;
    seen.add(item.title);
    if (item.score >= 2 || (item.score >= 1 && item.dist < 150)) ranked.push(item.title);
  }
  return ranked.slice(0, 3);
}

function usableExtract(title, extract) {
  if (!extract || extract.length < 80) return "";
  if (/ujednoznacznienie/i.test(title)) return "";
  const head = extract.slice(0, 320);
  if (/może odnosić się do|inne znaczenia|strona ujednoznaczniaj/i.test(head)) return "";
  return extract;
}

export async function loadSupplement(place, destinationId) {
  const city = CITY[destinationId] || "";
  const visitPromise = destinationId === "lodz" && place.id === "palac"
    ? fetchText(VISIT).catch(() => "")
    : Promise.resolve("");
  const [titles, visitRaw] = await Promise.all([findTitle(place, city), visitPromise]);
  let history = "";
  let source = "";
  for (const title of titles) {
    const data = await wikiQuery({
      action: "query",
      prop: "extracts",
      explaintext: "1",
      redirects: "1",
      titles: title,
    });
    const page = Object.values(data.query?.pages || {})[0];
    const extract = usableExtract(page?.title || title, page?.extract || "");
    if (!extract) continue;
    history = clip(freshHistory(extract, place.speech));
    source = wikiUrl(page?.title || title);
    break;
  }
  const visit = visitRaw ? visitFacts(visitRaw) : "";
  const sources = [source, visit ? VISIT : ""].filter(Boolean);
  return { history, visit, sources, found: Boolean(source) };
}
