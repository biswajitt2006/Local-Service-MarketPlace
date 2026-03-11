import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getProfile } from '../services/api';

const AppContext = createContext();

const mockBookings = [
  {
    id: 'BK-001',
    providerId: 3,
    providerName: 'Mike Johnson',
    service: 'Leak Repair',
    category: 'plumber',
    date: '2026-03-15',
    time: '10:00 AM',
    address: '123 Main St, Apt 4B',
    description: 'Kitchen faucet leaking',
    status: 'upcoming',
    cost: 80,
  },
  {
    id: 'BK-002',
    providerId: 1,
    providerName: 'Rajesh Kumar',
    service: 'Wiring & Rewiring',
    category: 'electrician',
    date: '2026-02-28',
    time: '2:00 PM',
    address: '456 Oak Ave',
    description: 'Rewire bedroom outlets',
    status: 'completed',
    cost: 135,
  },
  {
    id: 'BK-003',
    providerId: 11,
    providerName: 'Lisa Thompson',
    service: 'Deep Cleaning',
    category: 'cleaner',
    date: '2026-02-20',
    time: '9:00 AM',
    address: '789 Elm Dr',
    description: 'Full apartment deep clean',
    status: 'completed',
    cost: 90,
  },
  {
    id: 'BK-004',
    providerId: 9,
    providerName: 'Dr. Emily Ross',
    service: 'SAT Prep',
    category: 'tutor',
    date: '2026-03-20',
    time: '4:00 PM',
    address: 'Online',
    description: 'SAT Math preparation session',
    status: 'upcoming',
    cost: 70,
  },
];

const mockPayments = [
  { id: 'PAY-001', bookingId: 'BK-002', amount: 135, date: '2026-02-28', method: 'Credit Card', status: 'Paid' },
  { id: 'PAY-002', bookingId: 'BK-003', amount: 90, date: '2026-02-20', method: 'UPI', status: 'Paid' },
  { id: 'PAY-003', bookingId: 'BK-001', amount: 80, date: '2026-03-15', method: 'Credit Card', status: 'Pending' },
  { id: 'PAY-004', bookingId: 'BK-004', amount: 70, date: '2026-03-20', method: 'Wallet', status: 'Pending' },
];

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // true while checking stored token
  const [bookings, setBookings] = useState(mockBookings);
  const [payments] = useState(mockPayments);
  const [favorites, setFavorites] = useState([5, 9, 11]);

  // On mount, check localStorage for an existing token and auto-login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthLoading(false);
      return;
    }

    getProfile()
      .then((data) => {
        setUser(data.data); // backend returns { success, data: user }
        setIsLoggedIn(true);
      })
      .catch(() => {
        // Token invalid or expired — clear it
        localStorage.removeItem('token');
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const login = useCallback((userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const addBooking = useCallback((booking) => {
    setBookings((prev) => [booking, ...prev]);
  }, []);

  const toggleFavorite = useCallback((providerId) => {
    setFavorites((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId]
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn, user, authLoading, bookings, payments, favorites,
        login, logout, addBooking, toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
