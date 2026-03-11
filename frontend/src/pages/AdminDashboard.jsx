import { Users, Briefcase, Calendar, DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';

const stats = [
  { label: 'Total Users', value: '12,458', change: '+12.5%', trend: 'up', icon: Users, color: 'text-primary-600 bg-primary-50' },
  { label: 'Total Providers', value: '2,547', change: '+8.2%', trend: 'up', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Total Bookings', value: '34,892', change: '+18.7%', trend: 'up', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
  { label: 'Revenue', value: '$284,560', change: '+22.4%', trend: 'up', icon: DollarSign, color: 'text-amber-600 bg-amber-50' },
];

const recentBookings = [
  { id: 'BK-5001', user: 'John D.', provider: 'Rajesh Kumar', service: 'Wiring', amount: 90, status: 'Completed', date: '2026-03-08' },
  { id: 'BK-5002', user: 'Sarah P.', provider: 'Lisa Thompson', service: 'Deep Clean', amount: 60, status: 'In Progress', date: '2026-03-09' },
  { id: 'BK-5003', user: 'Mike R.', provider: 'David Chen', service: 'Custom Shelf', amount: 165, status: 'Upcoming', date: '2026-03-10' },
  { id: 'BK-5004', user: 'Nina K.', provider: 'Dr. Emily Ross', service: 'SAT Prep', amount: 70, status: 'Completed', date: '2026-03-07' },
  { id: 'BK-5005', user: 'Chris L.', provider: 'James Anderson', service: 'AC Repair', amount: 120, status: 'Upcoming', date: '2026-03-11' },
];

const categoryRevenue = [
  { category: 'Electrician', revenue: 45200, bookings: 5420, pct: 80 },
  { category: 'Plumber', revenue: 38100, bookings: 4890, pct: 68 },
  { category: 'Carpenter', revenue: 52300, bookings: 3210, pct: 93 },
  { category: 'HVAC', revenue: 61500, bookings: 2780, pct: 100 },
  { category: 'Tutor', revenue: 29800, bookings: 8410, pct: 53 },
  { category: 'Cleaner', revenue: 57660, bookings: 10082, pct: 95 },
];

const monthlyRevenue = [
  { month: 'Oct', value: 18400 },
  { month: 'Nov', value: 22100 },
  { month: 'Dec', value: 19800 },
  { month: 'Jan', value: 25600 },
  { month: 'Feb', value: 31200 },
  { month: 'Mar', value: 28400 },
];

export default function AdminDashboard() {
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl card-shadow p-6 mb-8">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of platform metrics and activity</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar type="admin" />

          <div className="flex-1 space-y-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(({ label, value, change, trend, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-xl card-shadow p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-semibold ${
                      trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Monthly revenue chart */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue</h2>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +22.4% vs last period
                </span>
              </div>
              <div className="flex items-end gap-4 h-48">
                {monthlyRevenue.map((m) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600">${(m.value / 1000).toFixed(1)}k</span>
                    <div
                      className="w-full gradient-primary rounded-t-lg transition-all duration-500 min-h-[8px]"
                      style={{ height: `${(m.value / maxRevenue) * 160}px` }}
                    />
                    <span className="text-xs text-gray-400">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Performance</h2>
              <div className="space-y-4">
                {categoryRevenue.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{cat.bookings.toLocaleString()} bookings</span>
                        <span className="font-semibold text-gray-700">${cat.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-700"
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="text-left py-3 px-2">ID</th>
                      <th className="text-left py-3 px-2">User</th>
                      <th className="text-left py-3 px-2">Provider</th>
                      <th className="text-left py-3 px-2">Service</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-right py-3 px-2">Amount</th>
                      <th className="text-right py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50 transition-smooth">
                        <td className="py-3 px-2 font-medium text-primary-600">{b.id}</td>
                        <td className="py-3 px-2 text-gray-700">{b.user}</td>
                        <td className="py-3 px-2 text-gray-700">{b.provider}</td>
                        <td className="py-3 px-2 text-gray-500">{b.service}</td>
                        <td className="py-3 px-2 text-gray-400">{new Date(b.date).toLocaleDateString()}</td>
                        <td className="py-3 px-2 text-right font-semibold text-gray-800">${b.amount}</td>
                        <td className="py-3 px-2 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            b.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                            b.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {b.status}
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
