import { readFileSync, writeFileSync } from "node:fs";
import { SPEECH as A } from "./speech-a.mjs";
import { SPEECH as B } from "./speech-b.mjs";
import { SPEECH as C } from "./speech-c.mjs";
import { SPEECH as D } from "./speech-d.mjs";

const speech = { ...A, ...B, ...C, ...D };
const places = JSON.parse(readFileSync(new URL("../coords-malta-final.json", import.meta.url), "utf8"))
  .filter((place) => place.id !== "tas-silg");
delete speech["tas-silg"];
const names = {
  smartcity: "Fort Ricasoli",
  "ghar-rih-gozo": "Jaskinia ir-Riħ na Gozo",
  "dingli-cliffs": "Ħad-Dingli",
  "mgarr-gozo-church": "Loreto przy promie",
};

const missing = [];
const short = [];
const body = places.map((place) => {
  const text = speech[place.id];
  if (!text) missing.push(place.id);
  else if (text.length < 450) short.push(`${place.id} ${text.length}`);
  const name = names[place.id] || place.name;
  return `  {
    id: ${JSON.stringify(place.id)},
    name: ${JSON.stringify(name)},
    area: ${JSON.stringify(place.area)},
    island: ${JSON.stringify(place.island)},
    lat: ${place.lat},
    lng: ${place.lng},
    radius: ${place.radius},
    speech: ${JSON.stringify(text || "")},
  }`;
});

if (missing.length || short.length) {
  console.log("MISSING", missing.join(", "));
  console.log("SHORT", short.join("\n"));
  process.exit(1);
}

const extra = Object.keys(speech).filter((id) => !places.some((place) => place.id === id));
if (extra.length) {
  console.log("EXTRA", extra.join(", "));
  process.exit(1);
}

const file = `export const MALTA_MORE = [\n${body.join(",\n")},\n];\n`;
writeFileSync(new URL("../js/malta-more.js", import.meta.url), file);
console.log("wrote", places.length, "chars", file.length);
