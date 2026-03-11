/**
 * Simulated AI recommendation engine.
 * Scores providers based on rating, distance, review count, and availability.
 */
export function getRecommendedProviders(providers, limit = 6) {
  const scored = providers.map((provider) => {
    const ratingWeight = provider.rating * 20;          // 0-100
    const distanceWeight = Math.max(0, 20 - provider.distance * 3); // closer = higher
    const reviewWeight = Math.min(provider.reviewCount / 5, 20);    // cap at 20
    const availabilityBonus = provider.availability ? 10 : 0;

    return {
      ...provider,
      score: ratingWeight + distanceWeight + reviewWeight + availabilityBonus,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getTopRatedProviders(providers, limit = 6) {
  return [...providers]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function filterProviders(providers, filters) {
  let result = [...providers];

  if (filters.minRating) {
    result = result.filter((p) => p.rating >= filters.minRating);
  }
  if (filters.maxPrice) {
    result = result.filter((p) => p.pricePerHour <= filters.maxPrice);
  }
  if (filters.maxDistance) {
    result = result.filter((p) => p.distance <= filters.maxDistance);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q)
    );
  }
  if (filters.sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (filters.sortBy === 'price-low') {
    result.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (filters.sortBy === 'price-high') {
    result.sort((a, b) => b.pricePerHour - a.pricePerHour);
  } else if (filters.sortBy === 'distance') {
    result.sort((a, b) => a.distance - b.distance);
  }

  return result;
}
