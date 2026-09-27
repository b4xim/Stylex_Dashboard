import React, { useState } from 'react';
import { Appointment } from '../types';

interface AppointmentsViewProps {
  appointments: Appointment[];
  onOpenNewBooking: () => void;
  onCheckout: (apt: Appointment) => void;
  onCheckIn: (aptId: string) => void;
  globalSearchQuery?: string;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  onOpenNewBooking,
  onCheckout,
  onCheckIn,
  globalSearchQuery = '',
}) => {
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const dates = [
    'Thursday, Oct 24',
    'Friday, Oct 25',
    'Saturday, Oct 26',
    'Sunday, Oct 27',
  ];
  const currentDate = dates[currentDateIndex];

  const filteredAppointments = appointments.filter((apt) => {
    if (!globalSearchQuery) return true;
    const q = globalSearchQuery.toLowerCase();
    return (
      apt.clientName.toLowerCase().includes(q) ||
      apt.serviceName.toLowerCase().includes(q) ||
      apt.stylistName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c2c8c2]/30 pb-6">
        <div className="flex flex-col">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Appointments
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Daily manifest and guest reception schedule.
          </p>
        </div>

        {/* Date switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#f0f5f1] px-2 py-1 rounded-full border border-[#c2c8c2]/30">
            <button
              onClick={() => setCurrentDateIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentDateIndex === 0}
              aria-label="Previous Day"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#181d1b] hover:bg-[#eaefeb] transition-colors disabled:opacity-30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-2 px-3">
              <span className="material-symbols-outlined text-[18px] text-[#112e20]">
                calendar_month
              </span>
              <span className="text-base font-semibold text-[#112e20] whitespace-nowrap">
                {currentDate}
              </span>
            </div>
            <button
              onClick={() => setCurrentDateIndex((prev) => Math.min(dates.length - 1, prev + 1))}
              disabled={currentDateIndex === dates.length - 1}
              aria-label="Next Day"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#181d1b] hover:bg-[#eaefeb] transition-colors disabled:opacity-30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          <button
            onClick={onOpenNewBooking}
            className="px-5 py-2.5 rounded-full bg-[#112e20] text-white text-[13px] font-semibold hover:bg-[#284435] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Manifest Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c2c8c2]/30 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-[#f0f5f1] text-[#424844] text-[11px] uppercase tracking-wider font-semibold border-b border-[#c2c8c2]/30 select-none">
                <th className="py-3.5 px-6">Time</th>
                <th className="py-3.5 px-4">Guest Name</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Assigned Stylist</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaefeb]">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-[#f0f5f1]/50 transition-colors">
                  <td className="py-4 px-6 align-middle">
                    <span className="text-base text-[#112e20] font-semibold block">
                      {apt.time}
                    </span>
                    <span className="text-xs text-[#424844] block mt-0.5">
                      {apt.durationMin} min
                    </span>
                  </td>

                  <td className="py-4 px-4 align-middle">
                    <div className="flex flex-col">
                      <span className="text-base text-[#181d1b] font-semibold">
                        {apt.clientName}
                      </span>
                      <span className="text-xs text-[#424844] mt-0.5">
                        {apt.clientTier || 'Guest'} • {apt.clientPhone}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 align-middle">
                    <span className="text-sm font-medium text-[#181d1b] block">
                      {apt.serviceName}
                    </span>
                    <span className="text-xs text-[#424844] block mt-0.5">{apt.station}</span>
                  </td>

                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-8 h-8 rounded-full object-cover shadow-xs border border-[#c2c8c2]/40"
                        src={apt.stylistAvatar}
                        alt={apt.stylistName}
                      />
                      <span className="text-sm font-medium text-[#181d1b]">
                        {apt.stylistName}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 align-middle">
                    {apt.status === 'IN_SESSION' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9b4521] text-white text-[11px] tracking-wider uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        In Session
                      </span>
                    ) : apt.status === 'PENDING' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] tracking-wider uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#735c00] animate-pulse"></span>
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#caead5] text-[#042014] text-[11px] tracking-wider uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#112e20]"></span>
                        Confirmed
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 align-middle text-right">
                    {apt.status === 'IN_SESSION' ? (
                      <button
                        onClick={() => onCheckout(apt)}
                        className="px-5 py-2 rounded-full bg-[#9b4521] text-white text-[13px] font-semibold hover:bg-[#752906] transition-all shadow-sm cursor-pointer"
                      >
                        Checkout
                      </button>
                    ) : (
                      <button
                        onClick={() => onCheckIn(apt.id)}
                        className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all shadow-sm cursor-pointer ${
                          apt.time.includes('11:30') || apt.status === 'CONFIRMED'
                            ? 'bg-[#112e20] text-white hover:bg-[#284435]'
                            : 'bg-[#e5e9e6] text-[#112e20] hover:bg-[#dfe4e0]'
                        }`}
                      >
                        Check In
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f0f5f1]/40 flex items-center justify-between border-t border-[#c2c8c2]/30 text-[#424844] text-xs">
          <span>Showing {filteredAppointments.length} appointments today</span>
          <span>Times shown in PDT • Live Sync Active</span>
        </div>
      </div>
    </div>
  );
};
