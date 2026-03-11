import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, User, ArrowRight } from 'lucide-react';

export default function BookingConfirmation() {
  const location = useLocation();
  const { booking, provider } = location.state || {};

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl card-shadow p-8 text-center animate-fade-in-up">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-500 text-sm">
            Your service has been booked successfully. You'll receive confirmation shortly.
          </p>

          {/* Booking details */}
          <div className="mt-8 bg-gray-50 rounded-xl p-5 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Booking ID</span>
              <span className="text-sm font-bold text-primary-600">{booking.id}</span>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Service Provider</p>
                <p className="text-sm font-medium text-gray-800">{booking.providerName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Date</p>
                <p className="text-sm font-medium text-gray-800">
                  {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Time</p>
                <p className="text-sm font-medium text-gray-800">{booking.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Address</p>
                <p className="text-sm font-medium text-gray-800">{booking.address}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600">Service Cost</span>
              <span className="text-xl font-bold text-gray-800">${booking.cost}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/dashboard/user"
              className="flex-1 flex items-center justify-center gap-2 py-3 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transition-smooth text-sm"
            >
              View My Bookings <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-smooth text-sm text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
