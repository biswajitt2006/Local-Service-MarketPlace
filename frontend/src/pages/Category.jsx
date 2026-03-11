import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Star, ArrowUpDown, X } from 'lucide-react';
import ProviderCard from '../components/ProviderCard';
import providers from '../data/providers.json';
import services from '../data/services.json';
import { filterProviders } from '../utils/recommendation';

export default function Category() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: 100,
    maxDistance: 10,
    sortBy: 'rating',
    search: searchQuery,
  });

  const category = services.find((s) => s.id === id);

  const filteredProviders = useMemo(() => {
    let source = id ? providers.filter((p) => p.category === id) : providers;
    return filterProviders(source, filters);
  }, [id, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const title = category ? category.name : searchQuery ? `Search: "${searchQuery}"` : 'All Providers';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Link to="/" className="hover:text-primary-600 transition-smooth">Home</Link>
            <span>/</span>
            <span className="text-gray-700">{title}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-sm text-gray-500 mt-1">{filteredProviders.length} providers available</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-smooth"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter panel */}
          <aside className={`${showFilters ? 'fixed inset-0 z-40 bg-black/40 lg:static lg:bg-transparent' : 'hidden lg:block'} lg:w-72 shrink-0`}>
            <div className={`${showFilters ? 'absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl overflow-auto lg:static lg:shadow-none lg:p-0' : ''}`}>
              {showFilters && (
                <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="bg-white rounded-2xl card-shadow p-6 sticky top-20">
                <h3 className="font-semibold text-gray-800 mb-5">Filters</h3>

                {/* Search */}
                <div className="mb-5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Search</label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    placeholder="Search providers..."
                    className="mt-2 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>

                {/* Rating */}
                <div className="mb-5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Minimum Rating</label>
                  <div className="flex gap-2 mt-2">
                    {[0, 3, 4, 4.5].map((r) => (
                      <button
                        key={r}
                        onClick={() => updateFilter('minRating', r)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${
                          filters.minRating === r
                            ? 'gradient-primary text-white'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {r === 0 ? 'All' : <><Star className="w-3 h-3 fill-current" />{r}+</>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Price: <span className="text-primary-600">${filters.maxPrice}/hr</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                    className="mt-2 w-full accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$20</span><span>$100</span>
                  </div>
                </div>

                {/* Distance */}
                <div className="mb-5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Distance: <span className="text-primary-600">{filters.maxDistance} km</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={filters.maxDistance}
                    onChange={(e) => updateFilter('maxDistance', Number(e.target.value))}
                    className="mt-2 w-full accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 km</span><span>10 km</span>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sort By</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      ['rating', 'Rating'],
                      ['distance', 'Nearest'],
                      ['price-low', 'Price ↑'],
                      ['price-high', 'Price ↓'],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => updateFilter('sortBy', value)}
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-smooth ${
                          filters.sortBy === value
                            ? 'gradient-primary text-white'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ArrowUpDown className="w-3 h-3" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Provider grid */}
          <div className="flex-1">
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">No providers found</h3>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
