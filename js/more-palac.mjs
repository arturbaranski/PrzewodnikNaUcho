const SKIP = new Set(
  "oraz albo przez tego tej ten dla jego która które który było była przy tylko także czyli jest się nie jak już tam stąd tutaj jesteś stoisz będzie można bardzo kiedy gdzie była było zostały został".split(" "),
);

function tokens(text) {
  return (text.toLowerCase().match(/[a-ząćęłńóśźż]{4,}/g) || []).filter((word) => !SKIP.has(word));
}

export function freshHistory(extract, speech) {
  const known = new Set(tokens(speech));
  const dropLuwr = /luwr/i.test(speech);
  const prepared = extract
    .replace(/==\s*[^=]+==/g, "\n")
    .replace(/\bmalt\./gi, "malt\u0001")
    .replace(/\b([A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]{1,3})\./g, "$1\u0001")
    .replace(/\b(\d+)\./g, "$1\u0001");
  const sentences = prepared
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.replace(/\u0001/g, ".").replace(/\s+/g, " ").trim())
    .filter((sentence) => {
      if (sentence.length <= 40) return false;
      if (dropLuwr && /luwr/i.test(sentence)) return false;
      if (/^[a-ząćęłńóśźż(]/.test(sentence)) return false;
      const close = sentence.indexOf(")");
      const open = sentence.indexOf("(");
      if (close >= 0 && close < 40 && (open < 0 || close < open)) return false;
      return true;
    });
  const kept = [];
  for (const sentence of sentences) {
    const words = tokens(sentence);
    const novel = words.filter((word) => !known.has(word));
    if (novel.length >= 4) kept.push(sentence);
  }
  return kept.join(" ");
}

function decode(value) {
  return value
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function visitFacts(html) {
  const today = html.match(/Dziś czynne:\s*([A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)/);
  const hour = (label) => {
    const pattern = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = html.match(new RegExp(`${pattern}</h3>\\s*<p[^>]*>([\\s\\S]*?)</p>`, "i"));
    return match ? `${label}: ${decode(match[1])}` : "";
  };
  const hours = [
    hour("Poniedziałek"),
    hour("Wtorek | Środa | Czwartek"),
    hour("Piątek | Sobota | Niedziela"),
  ].filter(Boolean);
  const notice = html.match(/W dniach[^<]{0,220}?przepraszamy\./);
  const start = html.indexOf("Wszystkie wystawy stałe i czasowe");
  const rest = start >= 0 ? html.slice(start) : "";
  const end = rest.indexOf("Wszystkie wystawy stałe</");
  const ticketBlock = end > 0 ? rest.slice(0, end) : rest.slice(0, 1800);
  const prices = [...ticketBlock.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((match) => decode(match[1])).filter(Boolean);
  const parts = [];
  if (today) parts.push(`Dziś muzeum podaje: ${today[1]}.`);
  if (hours.length) parts.push(`${hours.join(". ")}.`);
  const cutoff = html.match(/Zakup biletów wstępu[\s\S]{0,180}?Muzeum/);
  if (cutoff) parts.push(`${decode(cutoff[0])}.`);
  if (notice) parts.push(decode(notice[0]));
  if (prices.length) parts.push(`Bilet na wystawy stałe i czasowe: ${prices.join(", ")}.`);
  return parts.join(" ");
}
