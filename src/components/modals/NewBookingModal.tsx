import React, { useState } from 'react';
import { Appointment, ServiceItem, Stylist } from '../../types';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  stylists: Stylist[];
  onAddBooking: (booking: Appointment) => void;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  services,
  stylists,
  onAddBooking,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientTier, setClientTier] = useState<Appointment['clientTier']>('VIP Platinum');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [selectedStylistId, setSelectedStylistId] = useState(stylists[0]?.id || '');
  const [time, setTime] = useState('11:00 AM');
  const [dateStr, setDateStr] = useState('Thursday, Oct 24');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedStylist = stylists.find((s) => s.id === selectedStylistId) || stylists[0];
  const totalPrice = selectedService ? selectedService.price : 200;
  const depositAmount = Math.round(totalPrice * 0.25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const initials = clientName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'GT';

    const newBooking: Appointment = {
      id: `apt-${Date.now()}`,
      time,
      durationMin: selectedService?.durationMin || 60,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim() || '(310) 555-0199',
      clientInitials: initials,
      clientTier,
      serviceName: selectedService ? selectedService.name : 'Custom Atelier Ritual',
      station: selectedStylist ? selectedStylist.station : 'Styling Station',
      stylistName: selectedStylist ? selectedStylist.name : 'Elena Vance',
      stylistAvatar: selectedStylist ? selectedStylist.avatar : '',
      depositStatus: 'Deposit Paid',
      depositAmount,
      totalPrice,
      status: 'CONFIRMED',
      dateStr,
      notes: notes.trim(),
    };

    onAddBooking(newBooking);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112e20]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#c2c8c2]/50 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaefeb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0f5f1] text-[#112e20] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">calendar_add_on</span>
            </div>
            <div>
              <span className="text-[11px] text-[#9b4521] uppercase tracking-wider font-bold">
                Guest Reservation
              </span>
              <h3 className="font-serif text-2xl text-[#112e20]">New Atelier Booking</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#727973] hover:text-[#181d1b] rounded-full hover:bg-[#f0f5f1] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                Guest Full Name
              </label>
              <input
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Camille Vance"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                Phone Number
              </label>
              <input
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+1 (310) 555-0192"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                Client Distinction
              </label>
              <select
                value={clientTier}
                onChange={(e) => setClientTier(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              >
                <option value="VIP Platinum">VIP Platinum</option>
                <option value="VIP Gold">VIP Gold</option>
                <option value="VIP Member">VIP Member</option>
                <option value="New Guest">New Guest</option>
                <option value="Standard">Standard Client</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                Date & Manifest
              </label>
              <input
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                placeholder="Thursday, Oct 24"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                Salon Ritual / Service
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (${s.price} • {s.durationMin}m)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                Assigned Artisan / Stylist
              </label>
              <select
                value={selectedStylistId}
                onChange={(e) => setSelectedStylistId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              >
                {stylists.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#181d1b] mb-1">
              Time Slot
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['09:30 AM', '11:00 AM', '01:30 PM', '03:45 PM', '05:00 PM', '06:30 PM'].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`py-2 px-2 text-xs rounded-lg font-medium transition-all ${
                    time === slot
                      ? 'bg-[#112e20] text-white shadow-xs'
                      : 'bg-[#f0f5f1] text-[#181d1b] hover:bg-[#eaefeb]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#181d1b] mb-1">
              Client Consultation & Preferences
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Beverage preference, hair formula history, scalp sensitivity notes..."
              className="w-full px-3.5 py-2 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
            />
          </div>

          {/* Pricing & Deposit Summary */}
          <div className="p-3.5 rounded-xl bg-[#f0f5f1] border border-[#dfe4e0] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#112e20]">Service Value: ${totalPrice}</span>
              <p className="text-[#424844] mt-0.5">25% online booking deposit: ${depositAmount}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#112e20] text-white font-bold text-[11px] uppercase tracking-wider">
              Deposit Collected
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#424844] hover:bg-[#eaefeb] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#9b4521] text-white text-xs font-semibold hover:bg-[#752906] transition-all shadow-md cursor-pointer"
            >
              Confirm & Book Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
