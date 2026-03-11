import { Calendar, Clock, CreditCard, Star, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { useApp } from '../context/AppContext';

const statusColors = {
  upcoming: { bg: 'bg-blue-50', text: 'text-blue-600', icon: Clock },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle },
  cancelled: { bg: 'bg-red-50', text: 'text-red-500', icon: XCircle },
};

export default function UserDashboard() {
  const { user, bookings, payments, isLoggedIn, login } = useApp();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-2xl card-shadow p-10">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-sm text-gray-500 mb-6">Please log in to view your dashboard.</p>
          <button
            onClick={login}
            className="px-6 py-3 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transition-smooth text-sm"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  const upcoming = bookings.filter((b) => b.status === 'upcoming');
  const past = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User info */}
        <div className="bg-white rounded-2xl card-shadow p-6 mb-8">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-100" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar type="user" />

          <div className="flex-1 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-primary-600 bg-primary-50' },
                { label: 'Upcoming', value: upcoming.length, icon: Clock, color: 'text-blue-600 bg-blue-50' },
                { label: 'Completed', value: past.length, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Total Spent', value: `$${payments.reduce((s, p) => s + p.amount, 0)}`, icon: CreditCard, color: 'text-amber-600 bg-amber-50' },
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

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Bookings</h2>
              {upcoming.length > 0 ? (
                <div className="space-y-3">
                  {upcoming.map((b) => {
                    const status = statusColors[b.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${status.bg} rounded-xl flex items-center justify-center`}>
                            <StatusIcon className={`w-5 h-5 ${status.text}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{b.providerName}</p>
                            <p className="text-xs text-gray-400">{b.service} · {new Date(b.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">${b.cost}</p>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${status.bg} ${status.text}`}>
                            {b.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No upcoming bookings.</p>
              )}
            </div>

            {/* Past Bookings */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Past Bookings</h2>
              {past.length > 0 ? (
                <div className="space-y-3">
                  {past.map((b) => {
                    const status = statusColors[b.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${status.bg} rounded-xl flex items-center justify-center`}>
                            <StatusIcon className={`w-5 h-5 ${status.text}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{b.providerName}</p>
                            <p className="text-xs text-gray-400">{b.service} · {new Date(b.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">${b.cost}</p>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${status.bg} ${status.text}`}>
                            {b.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No past bookings.</p>
              )}
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="text-left py-3 px-2">ID</th>
                      <th className="text-left py-3 px-2">Booking</th>
                      <th className="text-left py-3 px-2">Method</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-right py-3 px-2">Amount</th>
                      <th className="text-right py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-smooth">
                        <td className="py-3 px-2 font-medium text-primary-600">{p.id}</td>
                        <td className="py-3 px-2 text-gray-600">{p.bookingId}</td>
                        <td className="py-3 px-2 text-gray-600">{p.method}</td>
                        <td className="py-3 px-2 text-gray-400">{new Date(p.date).toLocaleDateString()}</td>
                        <td className="py-3 px-2 text-right font-semibold text-gray-800">${p.amount}</td>
                        <td className="py-3 px-2 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            p.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
