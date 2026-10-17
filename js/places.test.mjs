import test from "node:test";
import assert from "node:assert/strict";
import { PLACES } from "./places.js";
import { distanceMeters } from "./engine.js";

const AREAS = ["Valletta", "Trzy Miasta", "Mdina i Rabat", "Centrum", "Prehistoria", "Południe", "Północ", "Gozo", "Comino"];

test("every place is on the Maltese islands and has a spoken story", () => {
  const ids = new Set();
  for (const place of PLACES) {
    assert.ok(!ids.has(place.id), `duplicate ${place.id}`);
    ids.add(place.id);
    assert.ok(place.lat > 35.78 && place.lat < 36.09, place.id);
    assert.ok(place.lng > 14.18 && place.lng < 14.6, place.id);
    assert.ok(AREAS.includes(place.area), place.area);
    assert.ok(["malta", "gozo", "comino"].includes(place.island), place.id);
    assert.ok(place.speech.length > 280, `${place.id} story too short`);
    assert.ok(place.radius >= 30 && place.radius <= 260, place.id);
  }
  assert.ok(PLACES.length >= 60);
});

test("stories do not overlap so much that two places fire together", () => {
  const clashes = [];
  for (let i = 0; i < PLACES.length; i += 1) {
    for (let j = i + 1; j < PLACES.length; j += 1) {
      const a = PLACES[i];
      const b = PLACES[j];
      const d = distanceMeters(a.lat, a.lng, b.lat, b.lng);
      if (d < a.radius + b.radius - 20) {
        clashes.push(`${a.id} & ${b.id}: ${Math.round(d)} m, radii ${a.radius}+${b.radius}`);
      }
    }
  }
  assert.deepEqual(clashes, []);
});
