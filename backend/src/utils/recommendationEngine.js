/**
 * AI-based Recommendation Engine
 *
 * Ranks providers using a weighted scoring formula:
 *   score = 0.4 * ratingScore
 *         + 0.3 * distanceScore
 *         + 0.2 * priceScore
 *         + 0.1 * availabilityScore
 */

// ─── Haversine distance (km) ────────────────────
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Min-max normalisation (0 → 1) ─────────────
function normalise(value, min, max) {
  if (max === min) return 1;
  return (value - min) / (max - min);
}

/**
 * Rank an array of provider documents.
 *
 * @param {Array}  providers  – Mongoose provider docs (plain objects)
 * @param {Number} userLat    – user latitude
 * @param {Number} userLng    – user longitude
 * @returns {Array} providers sorted by descending recommendation score
 */
function rankProviders(providers, userLat, userLng) {
  if (!providers.length) return [];

  // Pre-compute distances
  const enriched = providers.map((p) => {
    const dist =
      p.latitude != null && p.longitude != null && userLat != null && userLng != null
        ? haversineDistance(userLat, userLng, p.latitude, p.longitude)
        : null;
    return { ...p, _distance: dist };
  });

  // Determine min/max for normalisation
  const distances = enriched.filter((p) => p._distance !== null).map((p) => p._distance);
  const prices    = enriched.map((p) => p.pricePerHour);

  const minDist  = Math.min(...distances, 0);
  const maxDist  = Math.max(...distances, 1);
  const minPrice = Math.min(...prices, 0);
  const maxPrice = Math.max(...prices, 1);

  // Score each provider
  const scored = enriched.map((p) => {
    const ratingScore      = (p.ratingAverage || 0) / 5;
    const distanceScore    = p._distance !== null ? 1 - normalise(p._distance, minDist, maxDist) : 0.5;
    const priceScore       = 1 - normalise(p.pricePerHour, minPrice, maxPrice); // lower price → higher score
    const availabilityScore = p.availabilityStatus ? 1 : 0;

    const score =
      0.4 * ratingScore +
      0.3 * distanceScore +
      0.2 * priceScore +
      0.1 * availabilityScore;

    return { ...p, recommendationScore: Math.round(score * 1000) / 1000 };
  });

  // Sort descending
  scored.sort((a, b) => b.recommendationScore - a.recommendationScore);

  return scored;
}

module.exports = { rankProviders, haversineDistance };
