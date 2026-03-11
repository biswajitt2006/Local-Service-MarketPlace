import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Briefcase, CheckCircle, XCircle, Heart, ArrowLeft, Shield } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import providers from '../data/providers.json';
import reviews from '../data/reviews.json';
import { useApp } from '../context/AppContext';

export default function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isLoggedIn, login } = useApp();

  const provider = providers.find((p) => p.id === Number(id));
  const providerReviews = reviews.filter((r) => r.providerId === Number(id));
  const isFav = favorites.includes(provider?.id);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Provider not found</h2>
          <Link to="/" className="text-primary-600 mt-2 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    if (!isLoggedIn) login();
    navigate(`/booking/${provider.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-smooth">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile header */}
            <div className="bg-white rounded-2xl card-shadow p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-28 h-28 rounded-2xl object-cover ring-4 ring-gray-100"
                  />
                  {provider.availability && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-400 rounded-full border-3 border-white flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{provider.name}</h1>
                      <p className="text-sm text-gray-500 capitalize mt-1">{provider.category.replace('hvac', 'HVAC Technician')}</p>
                    </div>
                    <button
                      onClick={() => { if (!isLoggedIn) login(); toggleFavorite(provider.id); }}
                      className={`p-2.5 rounded-xl transition-smooth ${
                        isFav ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-gray-800">{provider.rating}</span>
                      <span className="text-sm text-gray-400">({provider.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{provider.distance} km away</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">{provider.experience} years exp.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Responds {provider.responseTime}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mt-4">{provider.bio}</p>
                </div>
              </div>
            </div>

            {/* Services offered */}
            <div className="bg-white rounded-2xl card-shadow p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-medium"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl card-shadow p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Customer Reviews ({providerReviews.length})
              </h2>
              {providerReviews.length > 0 ? (
                <div className="space-y-4">
                  {providerReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar - Booking CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl card-shadow p-6 sticky top-20">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800">
                  ${provider.pricePerHour}
                  <span className="text-base font-normal text-gray-400">/hr</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  {provider.availability ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Available Now
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-semibold">
                      <XCircle className="w-3.5 h-3.5" /> Currently Unavailable
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={!provider.availability}
                className="w-full py-3.5 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Book Service
              </button>

              <div className="mt-6 space-y-3">
                {[
                  { icon: Shield, text: 'Verified Professional' },
                  { icon: Clock, text: `Response Time: ${provider.responseTime}` },
                  { icon: Briefcase, text: `${provider.completedJobs} jobs completed` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon className="w-4 h-4 text-primary-500 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
