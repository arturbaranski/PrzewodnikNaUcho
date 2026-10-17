const EARTH_RADIUS_M = 6371000;

export function distanceMeters(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(a)));
}

export function formatDistance(meters) {
  if (meters == null || Number.isNaN(meters)) return "—";
  if (meters < 950) return `${Math.round(meters)} m`;
  const km = meters / 1000;
  const text = km < 10 ? km.toFixed(1) : String(Math.round(km));
  return `${text.replace(".", ",")} km`;
}

export function nearestPlace(places, lat, lng) {
  let best = null;
  for (const place of places) {
    const d = distanceMeters(lat, lng, place.lat, place.lng);
    if (!best || d < best.d) best = { place, d };
  }
  return best;
}

/**
 * Picks the place that should be treated as "you have arrived".
 * Poor GPS fixes return no target, so a coarse first reading does not
 * start the wrong story. The previous place sticks until another one
 * is clearly closer, which keeps the guide from flipping in narrow streets.
 */
export function chooseTarget(places, lat, lng, accuracy, lockedId, radiusScale, accuracyLimit) {
  const nearest = nearestPlace(places, lat, lng);
  if (accuracy == null || accuracy > accuracyLimit) {
    return { target: null, distance: nearest ? nearest.d : null, nearest, inRange: [], accurate: false };
  }

  const inRange = places
    .map((place) => ({
      place,
      d: distanceMeters(lat, lng, place.lat, place.lng),
      radius: place.radius * radiusScale,
    }))
    .filter((item) => item.d <= item.radius)
    .sort((a, b) => a.d - b.d);

  if (!inRange.length) {
    return { target: null, distance: nearest ? nearest.d : null, nearest, inRange, accurate: true };
  }

  let chosen = inRange[0];
  if (lockedId) {
    const locked = inRange.find((item) => item.place.id === lockedId);
    if (locked && locked.d <= chosen.d + 25) chosen = locked;
  }

  return {
    target: chosen.place,
    distance: chosen.d,
    nearest,
    inRange,
    accurate: true,
  };
}

export function canRepeat(spokenAt, id, repeatMode, now) {
  if (repeatMode === "always") return true;
  if (!spokenAt[id]) return true;
  if (repeatMode === "trip") return false;
  return now - spokenAt[id] >= 3 * 60 * 60 * 1000;
}
