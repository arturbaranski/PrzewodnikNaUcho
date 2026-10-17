import test from "node:test";
import assert from "node:assert/strict";
import { distanceMeters, chooseTarget, canRepeat, formatDistance } from "./engine.js";

const places = [
  { id: "a", lat: 35.8975, lng: 14.5122, radius: 50 },
  { id: "b", lat: 35.8978, lng: 14.5127, radius: 50 },
  { id: "far", lat: 36.0463, lng: 14.2396, radius: 80 },
];

test("distance from Valletta toward Mdina is several kilometres", () => {
  const d = distanceMeters(35.899, 14.514, 35.886, 14.403);
  assert.ok(d > 8000 && d < 12000);
});

test("poor accuracy does not trigger a story", () => {
  const result = chooseTarget(places, 35.8975, 14.5122, 400, null, 1, 85);
  assert.equal(result.target, null);
  assert.equal(result.accurate, false);
});

test("standing on a place selects it", () => {
  const result = chooseTarget(places, 35.8975, 14.5122, 12, null, 1, 85);
  assert.equal(result.target.id, "a");
});

test("nearby rival does not steal the story until it is clearly closer", () => {
  const locked = chooseTarget(places, 35.89762, 14.5124, 10, "a", 1, 85);
  assert.equal(locked.target.id, "a");
});

test("leaving the radius clears the target", () => {
  const result = chooseTarget(places, 35.91, 14.53, 10, "a", 1, 85);
  assert.equal(result.target, null);
});

test("trip mode speaks each place only once", () => {
  const now = Date.now();
  assert.equal(canRepeat({}, "a", "trip", now), true);
  assert.equal(canRepeat({ a: now - 1000 }, "a", "trip", now), false);
  assert.equal(canRepeat({ a: now - 1000 }, "a", "always", now), true);
  assert.equal(canRepeat({ a: now - 4 * 60 * 60 * 1000 }, "a", "visit", now), true);
});

test("formats metres and kilometres in Polish", () => {
  assert.equal(formatDistance(42), "42 m");
  assert.equal(formatDistance(2400), "2,4 km");
});
