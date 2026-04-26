/**
 * Calculate the distance between two points using the Haversine formula.
 * Returns distance in kilometers.
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Calculate score based on distance and elapsed time.
 * Max 10 points per round: 5 for precision + 5 for speed.
 *
 * Precision: 5 * e^(-distance / 500)
 * Time: 5 * max(0, 1 - elapsedSeconds / 60)
 */
export function calculateScore(distanceKm, elapsedSeconds = 0) {
  const precision = distanceKm <= 0 ? 5 : 5 * Math.exp(-distanceKm / 500);
  const time = 5 * Math.max(0, 1 - elapsedSeconds / 60);
  const total = Math.min(10, precision + time);
  return Math.round(total * 10) / 10; // round to 1 decimal
}
