import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import providers from '../data/providers.json';
import { useApp } from '../context/AppContext';

export default function Booking() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { addBooking, isLoggedIn, login } = useApp();

  const provider = providers.find((p) => p.id === Number(providerId));

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

  const handleSubmit = (formData) => {
    if (!isLoggedIn) login();

    const booking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      providerId: provider.id,
      providerName: provider.name,
      service: provider.services[0],
      category: provider.category,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      description: formData.description,
      status: 'upcoming',
      cost: provider.pricePerHour,
    };

    addBooking(booking);
    navigate('/booking-confirmation', { state: { booking, provider } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-smooth">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl card-shadow p-6 sm:p-8">
          {/* Provider mini card */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-6">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-100"
            />
            <div>
              <h2 className="font-semibold text-gray-800">{provider.name}</h2>
              <p className="text-sm text-gray-500 capitalize mt-0.5">{provider.category.replace('hvac', 'HVAC Technician')}</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">Book a Service</h1>
          <BookingForm provider={provider} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
