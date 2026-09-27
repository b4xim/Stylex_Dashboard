import React, { useState } from 'react';
import { LOGO_URL } from '../mockData';

interface HeaderProps {
  onOpenNewBooking: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onProfileClick: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewBooking,
  searchQuery,
  onSearchChange,
  onProfileClick,
  unreadCount = 2,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-[#f6faf7]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-[#dfe4e0]/60">
      {/* Left zone: Atelier Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img alt="StyleX Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
          <span className="font-semibold text-base text-[#112e20]">StyleX Atelier Portal</span>
        </div>

        <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f0f5f1] text-[#181d1b] border border-[#c2c8c2]/40">
          <span className="h-2 w-2 rounded-full bg-[#112e20] animate-pulse"></span>
          <span className="text-[13px] font-medium text-[#181d1b]">
            Beverly Hills Atelier • Open
          </span>
        </div>
      </div>

      {/* Right zone: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#424844] text-[18px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-72 lg:w-80 pl-10 pr-4 py-2 rounded-full bg-[#f0f5f1] text-[#181d1b] placeholder:text-[#424844] text-sm outline-none focus:bg-white focus:ring-1 focus:ring-[#112e20] border border-transparent focus:border-[#112e20]/20 transition-all shadow-xs"
            placeholder="Search bookings, clients, rituals..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-[#727973] hover:text-[#181d1b]"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* New Booking CTA */}
        <button
          onClick={onOpenNewBooking}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9b4521] text-white text-[13px] font-semibold shadow-sm hover:bg-[#752906] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Booking</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2.5 rounded-full hover:bg-[#eaefeb] transition-colors cursor-pointer text-[#181d1b]"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#9b4521] ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#c2c8c2]/50 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaefeb]">
                <h4 className="font-semibold text-sm text-[#112e20]">Atelier Notifications</h4>
                <span className="text-[11px] text-[#9b4521] font-bold uppercase tracking-wider">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-[#eaefeb] text-xs">
                <div className="py-2.5">
                  <p className="font-medium text-[#181d1b]">VIP Private Gala Buyout tomorrow</p>
                  <p className="text-[#424844] mt-0.5">Floor blackout begins at 10:00 AM</p>
                  <span className="text-[10px] text-[#727973] mt-1 block">15 min ago</span>
                </div>
                <div className="py-2.5">
                  <p className="font-medium text-[#181d1b]">New VIP Inquiry: Lady Genevieve</p>
                  <p className="text-[#424844] mt-0.5">Bridal suite buyout requested for 6 guests</p>
                  <span className="text-[10px] text-[#727973] mt-1 block">35 min ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-[#e5e9e6]"></div>

        {/* Elena Vance Profile */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 pl-1 text-left hover:opacity-80 transition-opacity cursor-pointer group"
          title="Atelier Master Profile & Sign In"
        >
          <div className="w-9 h-9 rounded-full bg-[#112e20] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-[#eaefeb]">
            EV
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] font-semibold text-[#112e20] leading-tight group-hover:text-[#9b4521] transition-colors">
              Elena Vance
            </span>
            <span className="text-[11px] text-[#9b4521] font-medium leading-none mt-0.5">
              Atelier Master & Admin
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
