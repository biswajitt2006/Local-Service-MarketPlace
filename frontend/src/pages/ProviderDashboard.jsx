import { useState } from 'react';
import { Calendar, Clock, CreditCard, Star, CheckCircle, XCircle, TrendingUp, DollarSign } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import ReviewCard from '../components/ReviewCard';
import reviews from '../data/reviews.json';

const mockRequests = [
  { id: 'REQ-001', customerName: 'Sophie Kim', service: 'Wiring & Rewiring', date: '2026-03-12', time: '10:00 AM', address: '55 Pine St', status: 'pending' },
  { id: 'REQ-002', customerName: 'Daniel Moore', service: 'Panel Upgrades', date: '2026-03-14', time: '2:00 PM', address: '120 Cedar Rd', status: 'pending' },
  { id: 'REQ-003', customerName: 'Prachi Shah', service: 'Smart Home Setup', date: '2026-03-16', time: '11:00 AM', address: '87 Maple Dr', status: 'pending' },
];

const mockAccepted = [
  { id: 'BK-101', customerName: 'Amit Singh', service: 'Lighting Installation', date: '2026-03-10', time: '9:00 AM', address: '34 Elm St', cost: 90 },
  { id: 'BK-102', customerName: 'Karen Liu', service: 'Electrical Inspections', date: '2026-03-11', time: '1:00 PM', address: '78 Oak Ave', cost: 120 },
];

const earningsData = {
  thisMonth: 2450,
  lastMonth: 3120,
  total: 18750,
  pendingPayout: 680,
  weeklySummary: [
    { week: 'Week 1', amount: 580 },
    { week: 'Week 2', amount: 720 },
    { week: 'Week 3', amount: 650 },
    { week: 'Week 4', amount: 500 },
  ],
};

export default function ProviderDashboard() {
  const [requests, setRequests] = useState(mockRequests);
  const providerReviews = reviews.filter((r) => r.providerId === 1);

  const acceptRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };
  const declineRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl card-shadow p-6 mb-8">
          <h1 className="text-xl font-bold text-gray-800">Provider Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your bookings, earnings, and reviews</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar type="provider" />

          <div className="flex-1 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'This Month', value: `$${earningsData.thisMonth}`, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Total Earnings', value: `$${earningsData.total.toLocaleString()}`, icon: TrendingUp, color: 'text-primary-600 bg-primary-50' },
                { label: 'Pending Requests', value: requests.length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
                { label: 'Active Bookings', value: mockAccepted.length, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-xl card-shadow p-4">
                  <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Incoming Requests */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Incoming Requests</h2>
              {requests.length > 0 ? (
                <div className="space-y-3">
                  {requests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{req.customerName}</p>
                        <p className="text-xs text-gray-400">{req.service} · {req.date}, {req.time}</p>
                        <p className="text-xs text-gray-400">{req.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => acceptRequest(req.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-smooth"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button
                          onClick={() => declineRequest(req.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100 transition-smooth"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No pending requests.</p>
              )}
            </div>

            {/* Accepted Bookings */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Accepted Bookings</h2>
              <div className="space-y-3">
                {mockAccepted.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{b.customerName}</p>
                        <p className="text-xs text-gray-400">{b.service} · {b.date}, {b.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800">${b.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Summary</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4">
                  <p className="text-xs text-emerald-600 font-medium">Last Month</p>
                  <p className="text-2xl font-bold text-emerald-700 mt-1">${earningsData.lastMonth}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4">
                  <p className="text-xs text-amber-600 font-medium">Pending Payout</p>
                  <p className="text-2xl font-bold text-amber-700 mt-1">${earningsData.pendingPayout}</p>
                </div>
              </div>
              <div className="space-y-2">
                {earningsData.weeklySummary.map((week) => (
                  <div key={week.week} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-16">{week.week}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${(week.amount / 800) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-12 text-right">${week.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {providerReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
