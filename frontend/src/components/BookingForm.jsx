import { useState } from 'react';
import { Calendar, Clock, MapPin, FileText } from 'lucide-react';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
];

export default function BookingForm({ provider, onSubmit }) {
  const [form, setForm] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.address) return;
    onSubmit(form);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date picker */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Calendar className="w-4 h-4 text-primary-500" />
          Select Date
        </label>
        <input
          type="date"
          min={today}
          value={form.date}
          onChange={(e) => handleChange('date', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-smooth"
          required
        />
      </div>

      {/* Time selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Clock className="w-4 h-4 text-primary-500" />
          Select Time
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => handleChange('time', slot)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
                form.time === slot
                  ? 'gradient-primary text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 text-primary-500" />
          Service Address
        </label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter your complete address"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-smooth"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 text-primary-500" />
          Service Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the service you need..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-smooth resize-none"
        />
      </div>

      {/* Cost estimate */}
      <div className="bg-primary-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estimated Cost (1 hr)</span>
          <span className="text-lg font-bold text-primary-700">${provider?.pricePerHour || 0}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Final cost may vary based on service duration</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3.5 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transition-smooth text-sm"
      >
        Confirm Booking
      </button>
    </form>
  );
}
