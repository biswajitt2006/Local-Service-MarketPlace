import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Shield, Clock, Star, Sparkles } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ProviderCard from '../components/ProviderCard';
import services from '../data/services.json';
import providers from '../data/providers.json';
import { getRecommendedProviders, getTopRatedProviders } from '../utils/recommendation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const recommended = getRecommendedProviders(providers);
  const topRated = getTopRatedProviders(providers);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Trusted by 50,000+ homeowners
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Find Expert Local
              <span className="block bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Service Providers
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Book verified electricians, plumbers, carpenters, and more — in just a few clicks.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services like plumber, electrician..."
                  className="w-full pl-12 pr-36 py-4 bg-white text-gray-800 rounded-2xl text-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-smooth"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {[
                { icon: Shield, label: 'Verified Pros', value: '2,500+' },
                { icon: Star, label: 'Avg Rating', value: '4.8★' },
                { icon: Clock, label: 'Avg Response', value: '< 30 min' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Icon className="w-4 h-4 text-amber-300" />
                    <span className="text-lg font-bold">{value}</span>
                  </div>
                  <span className="text-xs text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
          <p className="text-gray-500 mt-2">Find the right professional for every home need</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <CategoryCard key={service.id} category={service} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">AI Recommended</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Recommended for You</h2>
              <p className="text-gray-500 mt-1">Top-scored providers based on rating, proximity & availability</p>
            </div>
            <button
              onClick={() => navigate('/search?q=')}
              className="hidden md:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-smooth"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Highest Rated</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Top Rated Providers</h2>
            <p className="text-gray-500 mt-1">Trusted experts with outstanding customer reviews</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRated.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="text-gray-500 mt-2">Get your service booked in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Search & Browse', desc: 'Find the right service provider by category, rating, or location.', color: 'from-blue-400 to-indigo-500' },
              { step: '02', title: 'Compare & Choose', desc: 'Review profiles, ratings, and prices to pick the perfect match.', color: 'from-amber-400 to-orange-500' },
              { step: '03', title: 'Book & Relax', desc: 'Schedule your appointment and let the experts handle the rest.', color: 'from-emerald-400 to-teal-500' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="relative bg-white rounded-2xl p-8 card-shadow text-center group hover:-translate-y-1 transition-smooth">
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xl mb-5 group-hover:scale-110 transition-smooth shadow-lg`}>
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
