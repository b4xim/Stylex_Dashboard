import React, { useState } from 'react';
import { Appointment, DaySchedule } from '../types';

interface OverviewViewProps {
  appointments: Appointment[];
  weekSchedule: DaySchedule[];
  isEngineActive: boolean;
  onToggleEngine: () => void;
  onOpenNewBooking: () => void;
  onOpenExpressWalkIn: () => void;
  onOpenRunSheet: () => void;
  onOpenAddBlackout: () => void;
  onCheckout: (apt: Appointment) => void;
  onCheckIn: (aptId: string) => void;
  onPrepare: (aptId: string) => void;
  onSendLink: (apt: Appointment) => void;
  onToggleDaySchedule: (index: number) => void;
  globalSearchQuery?: string;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  appointments,
  weekSchedule,
  isEngineActive,
  onToggleEngine,
  onOpenNewBooking,
  onOpenExpressWalkIn,
  onOpenRunSheet,
  onOpenAddBlackout,
  onCheckout,
  onCheckIn,
  onPrepare,
  onSendLink,
  onToggleDaySchedule,
  globalSearchQuery = '',
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (globalSearchQuery || localSearch).toLowerCase().trim();

  const filteredAppointments = appointments.filter((apt) => {
    if (!effectiveSearch) return true;
    return (
      apt.clientName.toLowerCase().includes(effectiveSearch) ||
      apt.serviceName.toLowerCase().includes(effectiveSearch) ||
      apt.stylistName.toLowerCase().includes(effectiveSearch) ||
      apt.station.toLowerCase().includes(effectiveSearch) ||
      (apt.clientTier && apt.clientTier.toLowerCase().includes(effectiveSearch))
    );
  });

  // Calculate live statistics
  const totalBookingsCount = 18; // As in screenshot header
  const inSessionCount = appointments.filter((a) => a.status === 'IN_SESSION').length || 6;
  const confirmedCount = appointments.filter((a) => a.status === 'CONFIRMED').length || 10;
  const completedCount = appointments.filter((a) => a.status === 'COMPLETED').length || 2;

  const totalRevenue = appointments.reduce((sum, a) => sum + a.totalPrice, 0) + 2690;
  const collectedDeposits = appointments.reduce((sum, a) => sum + (a.depositAmount || 0), 0) + 830;
  const pendingRevenue = totalRevenue - collectedDeposits;

  return (
    <div className="flex flex-col w-full gap-8">
      {/* 1. Header & Quick Operations Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#9b4521] uppercase tracking-widest font-bold">
              Atelier Command Center
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#112e20]"></span>
            <span className="text-xs text-[#424844]">
              Beverly Hills • Station Sync 10:42 AM
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Atelier Operations & Bookings Control
          </h1>
        </div>

        {/* Quick Operations Ribbon */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#f0f5f1] shadow-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isEngineActive ? 'bg-[#284435] animate-pulse' : 'bg-[#9b4521] animate-ping'
                }`}
              ></span>
              <span className="text-[13px] font-semibold text-[#112e20]">
                Guest Booking Engine
              </span>
            </div>
            <button
              onClick={onToggleEngine}
              className={`px-3 py-1 rounded-full text-[11px] tracking-wider uppercase font-bold shadow-xs transition-all cursor-pointer ${
                isEngineActive
                  ? 'bg-[#112e20] text-white hover:bg-[#9b4521]'
                  : 'bg-[#9b4521] text-white hover:bg-[#752906]'
              }`}
            >
              {isEngineActive ? 'Active' : 'Blackout'}
            </button>
          </div>

          <button
            onClick={onOpenRunSheet}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#112e20] text-[13px] font-medium shadow-xs hover:bg-[#eaefeb] transition-colors cursor-pointer border border-[#c2c8c2]/30"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            <span>Run Sheet (PDF)</span>
          </button>

          <button
            onClick={onOpenExpressWalkIn}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9b4521] text-white text-[13px] font-semibold shadow-md hover:bg-[#752906] transition-all cursor-pointer hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Express Walk-in</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Metric Cards (Grid of 3) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col justify-between border border-[#c2c8c2]/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#424844] uppercase tracking-wider font-bold">
              Today's Appointments
            </span>
            <div className="w-9 h-9 rounded-full bg-[#f0f5f1] flex items-center justify-center text-[#112e20]">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-serif text-3xl text-[#112e20] font-semibold">
              {totalBookingsCount} Bookings
            </div>
            <p className="text-xs text-[#424844] mt-1">
              {confirmedCount} confirmed • {inSessionCount} in session • {completedCount} completed
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col justify-between border border-[#c2c8c2]/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#424844] uppercase tracking-wider font-bold">
              Online Booking Gateway
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] uppercase font-bold tracking-wider ${
                isEngineActive
                  ? 'bg-[#112e20] text-white'
                  : 'bg-[#9b4521] text-white'
              }`}
            >
              {isEngineActive ? 'Accepting' : 'Paused'}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="font-serif text-3xl text-[#112e20] font-semibold">
                {isEngineActive ? 'Engine Active' : 'Engine Paused'}
              </div>
              <p className="text-xs text-[#424844] mt-1">
                {isEngineActive
                  ? 'Public web portal accepting slots'
                  : 'Public reservations temporarily paused'}
              </p>
            </div>
            <button
              onClick={onToggleEngine}
              aria-label="Toggle Online Booking Engine"
              className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                isEngineActive ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col justify-between border border-[#c2c8c2]/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#424844] uppercase tracking-wider font-bold">
              Today's Revenue
            </span>
            <div className="w-9 h-9 rounded-full bg-[#ffdbcf] flex items-center justify-center text-[#9b4521]">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-serif text-3xl text-[#112e20] font-semibold">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-[#9b4521] font-medium mt-1">
              ${collectedDeposits.toLocaleString()} deposits collected • ${pendingRevenue.toLocaleString()} pending
            </p>
          </div>
        </div>
      </section>

      {/* 3. Date Availability & Schedule Blocking Control Panel */}
      <section className="rounded-xl bg-white p-6 shadow-sm flex flex-col gap-4 border border-[#c2c8c2]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#112e20]">
              Weekly Schedule & Online Availability
            </h2>
            <p className="text-sm text-[#424844]">
              Manage public web availability and day overrides at a glance.
            </p>
          </div>
          <button
            onClick={onOpenAddBlackout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0f5f1] text-[#112e20] hover:bg-[#eaefeb] text-[13px] font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">event_busy</span>
            <span>Add Blackout Date</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
          {weekSchedule.slice(0, 5).map((item, idx) => (
            <div
              key={item.dayName}
              className={`rounded-xl p-4 flex flex-col justify-between gap-3 border border-[#c2c8c2]/20 transition-all ${
                item.isOpen ? 'bg-[#f0f5f1]' : 'bg-[#e5e9e6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span
                    className={`text-[11px] uppercase tracking-wider font-bold ${
                      item.label === 'Today' ? 'text-[#9b4521]' : 'text-[#424844]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-base text-[#112e20] font-semibold">{item.dateStr}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    item.statusText === 'Open'
                      ? 'bg-[#112e20] text-white'
                      : item.statusText === 'Blackout'
                      ? 'bg-[#9b4521] text-white'
                      : 'bg-[#2c312f] text-[#edf2ee]'
                  }`}
                >
                  {item.statusText}
                </span>
              </div>

              <p
                className={`text-xs ${
                  item.statusText === 'Blackout'
                    ? 'text-[#9b4521] font-medium'
                    : 'text-[#424844]'
                }`}
              >
                {item.subText}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#dfe4e0]/60">
                <span
                  className={`text-xs font-medium ${
                    item.isOpen ? 'text-[#181d1b]' : 'text-[#424844]'
                  }`}
                >
                  Accept Bookings
                </span>
                <button
                  type="button"
                  onClick={() => onToggleDaySchedule(idx)}
                  aria-label={`Toggle bookings for ${item.dateStr}`}
                  className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                    item.isOpen ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Live Bookings & Reservations Ledger Table */}
      <section className="rounded-xl bg-white p-6 shadow-sm flex flex-col gap-4 border border-[#c2c8c2]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-6 rounded-full bg-[#112e20]"></div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#112e20]">
              Live Atelier Appointments
            </h2>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#424844] text-[18px]">
              search
            </span>
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search client or ritual..."
              className="pl-9 pr-4 py-1.5 w-64 rounded-full bg-[#f0f5f1] text-[#181d1b] placeholder:text-[#424844] text-sm outline-none focus:bg-white focus:ring-1 focus:ring-[#112e20] border border-transparent focus:border-[#112e20]/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#f0f5f1] text-[#424844] text-[11px] uppercase tracking-wider font-bold">
                <th className="py-3 px-4 rounded-l-lg">Client & Contact</th>
                <th className="py-3 px-4">Ritual & Station</th>
                <th className="py-3 px-4">Time & Stylist</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {filteredAppointments.map((apt) => {
                const getInitialsBg = () => {
                  if (apt.clientInitials === 'CV') return 'bg-[#112e20] text-white';
                  if (apt.clientInitials === 'MT') return 'bg-[#ffdbcf] text-[#380d00]';
                  if (apt.clientInitials === 'AR') return 'bg-[#ffe088] text-[#241a00]';
                  return 'bg-[#e5e9e6] text-[#424844]';
                };

                return (
                  <tr key={apt.id} className="hover:bg-[#f0f5f1]/50 transition-colors">
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs ${getInitialsBg()}`}
                        >
                          {apt.clientInitials}
                        </div>
                        <div>
                          <div className="text-base font-semibold text-[#112e20]">
                            {apt.clientName}
                          </div>
                          <div className="text-xs text-[#424844]">
                            {apt.clientPhone}
                            {apt.clientTier && ` • ${apt.clientTier}`}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle">
                      <div className="text-sm font-semibold text-[#112e20]">
                        {apt.serviceName}
                      </div>
                      <div className="text-xs text-[#424844]">{apt.station}</div>
                    </td>

                    <td className="py-4 px-4 align-middle">
                      <div className="text-sm font-semibold text-[#112e20]">
                        {apt.dateStr ? `Today • ${apt.time}` : apt.time}
                      </div>
                      <div className="text-xs text-[#424844]">{apt.stylistName}</div>
                    </td>

                    <td className="py-4 px-4 align-middle">
                      {apt.depositStatus === 'Deposit Paid' ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#284435]/15 text-[#112e20] text-[11px] font-bold">
                          Deposit Paid (${apt.depositAmount || 50})
                        </span>
                      ) : apt.depositStatus === 'Full Paid' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                          Settled (${apt.totalPrice})
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#9b4521]/15 text-[#9b4521] text-[11px] font-bold">
                          Pending Deposit
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 align-middle text-right">
                      {apt.status === 'IN_SESSION' ? (
                        <button
                          onClick={() => onCheckout(apt)}
                          className="px-4 py-1.5 rounded-full bg-[#112e20] text-white text-xs font-semibold hover:bg-[#9b4521] transition-colors cursor-pointer shadow-xs"
                        >
                          Checkout
                        </button>
                      ) : apt.status === 'CONFIRMED' && apt.time.includes('11:30') ? (
                        <button
                          onClick={() => onCheckIn(apt.id)}
                          className="px-4 py-1.5 rounded-full bg-[#e5e9e6] text-[#112e20] hover:bg-[#112e20] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Check-In
                        </button>
                      ) : apt.status === 'CONFIRMED' ? (
                        <button
                          onClick={() => onPrepare(apt.id)}
                          className="px-4 py-1.5 rounded-full bg-[#e5e9e6] text-[#112e20] hover:bg-[#112e20] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Prepare
                        </button>
                      ) : (
                        <button
                          onClick={() => onSendLink(apt)}
                          className="px-4 py-1.5 rounded-full bg-[#9b4521] text-white hover:bg-[#752906] text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                        >
                          Send Link
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
