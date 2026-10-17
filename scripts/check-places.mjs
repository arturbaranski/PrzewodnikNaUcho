import { PLACES } from "../js/places.js";
import { MORE_TEXT } from "../js/more-text.js";

const ids = PLACES.map((p) => p.id);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
const orphan = Object.keys(MORE_TEXT).filter((id) => !ids.includes(id));
const noExtra = ids.filter((id) => !MORE_TEXT[id]);
console.log("count", PLACES.length);
console.log("dup", dup);
console.log("text keys", Object.keys(MORE_TEXT).length);
console.log("places without extra", noExtra);
console.log("orphan text", orphan);

const bbox = PLACES.filter((p) => p.lat < 35.78 || p.lat > 36.09 || p.lng < 14.18 || p.lng > 14.6);
console.log("outside bbox", bbox.map((p) => p.id));

const short = PLACES.filter((p) => p.speech.length < 900).map((p) => [p.id, p.speech.length]);
console.log("under 900 chars", short);

const lens = PLACES.map((p) => p.speech.length).sort((a, b) => a - b);
console.log("speech chars min/median/max", lens[0], lens[Math.floor(lens.length / 2)], lens[lens.length - 1]);

function dist(a, b) {
  const R = 6371000;
  const p1 = (a.lat * Math.PI) / 180;
  const p2 = (b.lat * Math.PI) / 180;
  const dp = ((b.lat - a.lat) * Math.PI) / 180;
  const dl = ((b.lng - a.lng) * Math.PI) / 180;
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

const close = [];
for (let i = 0; i < PLACES.length; i += 1) {
  for (let j = i + 1; j < PLACES.length; j += 1) {
    const d = dist(PLACES[i], PLACES[j]);
    const inside = d < Math.max(PLACES[i].radius, PLACES[j].radius);
    if (d < 55 || inside) {
      close.push([Math.round(d), PLACES[i].id, PLACES[i].radius, PLACES[j].id, PLACES[j].radius, inside ? "INSIDE" : ""]);
    }
  }
}
close.sort((a, b) => a[0] - b[0]);
console.log("close pairs", close.length);
for (const row of close) console.log(row.join(" | "));
