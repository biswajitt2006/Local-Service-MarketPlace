import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProviderCard({ provider }) {
  const { favorites, toggleFavorite, isLoggedIn, login } = useApp();
  const isFav = favorites.includes(provider.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      login();
    }
    toggleFavorite(provider.id);
  };

  return (
    <div className="group bg-white rounded-2xl card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 overflow-hidden">
      {/* Header with image */}
      <div className="relative p-5 pb-0">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100 group-hover:ring-primary-200 transition-smooth"
            />
            {provider.availability && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white" title="Available" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-smooth truncate">
                  {provider.name}
                </h3>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{provider.category.replace('hvac', 'HVAC Technician')}</p>
              </div>
              <button
                onClick={handleFavorite}
                className={`p-1.5 rounded-lg transition-smooth ${
                  isFav
                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                    : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-semibold text-gray-700">{provider.rating}</span>
                <span className="text-xs text-gray-400">({provider.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">{provider.distance} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 pt-4">
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{provider.bio}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <div>
            <span className="text-2xl font-bold text-gray-800">${provider.pricePerHour}</span>
            <span className="text-sm text-gray-400">/hr</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {provider.responseTime}
          </div>
        </div>

        <Link
          to={`/provider/${provider.id}`}
          className="mt-4 block text-center py-2.5 rounded-xl text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 transition-smooth"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
