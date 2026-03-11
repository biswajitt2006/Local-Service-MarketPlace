import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">ServiConnect</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your trusted marketplace for finding reliable local service professionals. Quality service, just a click away.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-smooth">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {['Electrician', 'Plumber', 'Carpenter', 'HVAC Technician', 'Tutor', 'Cleaner'].map((s) => (
                <li key={s}>
                  <Link to={`/category/${s.toLowerCase().split(' ')[0]}`} className="hover:text-primary-400 transition-smooth">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['About Us', '/'],
                ['How it Works', '/'],
                ['Become a Provider', '/dashboard/provider'],
                ['User Dashboard', '/dashboard/user'],
                ['Admin Panel', '/dashboard/admin'],
              ].map(([label, link]) => (
                <li key={label}>
                  <Link to={link} className="hover:text-primary-400 transition-smooth">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span>123 Market Street, Silicon Valley, CA 94000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>+1 (555) 987-6543</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>support@serviconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; 2026 ServiConnect. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-gray-300 transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-smooth">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
