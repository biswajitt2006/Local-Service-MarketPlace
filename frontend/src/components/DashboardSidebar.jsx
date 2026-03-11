import { NavLink } from 'react-router-dom';
import { Home, Calendar, Clock, CreditCard, Star, Users, BarChart3, Settings } from 'lucide-react';

const userLinks = [
  { to: '/dashboard/user', icon: Home, label: 'Overview', end: true },
  { to: '/dashboard/user/bookings', icon: Calendar, label: 'My Bookings' },
  { to: '/dashboard/user/payments', icon: CreditCard, label: 'Payments' },
  { to: '/dashboard/user/reviews', icon: Star, label: 'My Reviews' },
];

const providerLinks = [
  { to: '/dashboard/provider', icon: Home, label: 'Overview', end: true },
  { to: '/dashboard/provider/requests', icon: Clock, label: 'Requests' },
  { to: '/dashboard/provider/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/dashboard/provider/earnings', icon: CreditCard, label: 'Earnings' },
  { to: '/dashboard/provider/reviews', icon: Star, label: 'Reviews' },
];

const adminLinks = [
  { to: '/dashboard/admin', icon: Home, label: 'Overview', end: true },
  { to: '/dashboard/admin/users', icon: Users, label: 'Users' },
  { to: '/dashboard/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/admin/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardSidebar({ type = 'user' }) {
  const links = type === 'admin' ? adminLinks : type === 'provider' ? providerLinks : userLinks;
  const title = type === 'admin' ? 'Admin Panel' : type === 'provider' ? 'Provider Hub' : 'My Dashboard';

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-2xl card-shadow p-4 sticky top-20">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">{title}</h2>
        <nav className="space-y-1">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
                  isActive
                    ? 'gradient-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
