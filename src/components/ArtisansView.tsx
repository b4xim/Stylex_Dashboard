import React, { useState } from 'react';
import { Stylist } from '../types';

interface ArtisansViewProps {
  stylists: Stylist[];
  onOpenNewBookingWithStylist: (stylistId: string) => void;
  globalSearchQuery?: string;
}

export const ArtisansView: React.FC<ArtisansViewProps> = ({
  stylists,
  onOpenNewBookingWithStylist,
  globalSearchQuery = '',
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [artisanList, setArtisanList] = useState<Stylist[]>(stylists);

  const effectiveSearch = (globalSearchQuery || localSearch).toLowerCase().trim();

  const filtered = artisanList.filter((s) => {
    if (!effectiveSearch) return true;
    return (
      s.name.toLowerCase().includes(effectiveSearch) ||
      s.role.toLowerCase().includes(effectiveSearch) ||
      s.specialty.toLowerCase().includes(effectiveSearch) ||
      s.station.toLowerCase().includes(effectiveSearch)
    );
  });

  const toggleAvailability = (id: string) => {
    setArtisanList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isAvailableToday: !s.isAvailableToday } : s))
    );
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c2c8c2]/30 pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Artisans & Stylists
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Master colorists, trichology specialists, and hair artists at the Beverly Hills atelier.
          </p>
        </div>

        <div className="relative w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#424844] text-[18px]">
            search
          </span>
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-[#181d1b] placeholder:text-[#424844] text-sm outline-none shadow-xs border border-[#c2c8c2]/30 focus:ring-1 focus:ring-[#112e20]"
            placeholder="Search stylists, stations..."
          />
        </div>
      </div>

      {/* Grid of Stylists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((stylist) => (
          <div
            key={stylist.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#c2c8c2]/30 flex flex-col justify-between gap-4 transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <img
                src={stylist.avatar}
                alt={stylist.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-[#eaefeb] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-[#112e20] font-semibold truncate">
                    {stylist.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#735c00] bg-[#ffe088]/40 px-2 py-0.5 rounded-md shrink-0">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span>{stylist.rating}</span>
                    <span className="text-[#424844] font-normal">({stylist.reviewsCount})</span>
                  </div>
                </div>

                <p className="text-xs text-[#9b4521] font-semibold uppercase tracking-wider mt-0.5">
                  {stylist.role}
                </p>

                <p className="text-xs text-[#424844] mt-2 line-clamp-2">
                  {stylist.bio}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eaefeb] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#424844]">Assigned Station:</span>
                <span className="font-semibold text-[#112e20]">{stylist.station}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#424844]">Specialty:</span>
                <span className="font-medium text-[#181d1b] text-right truncate max-w-[240px]">
                  {stylist.specialty}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#eaefeb]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleAvailability(stylist.id)}
                  aria-label={`Toggle availability for ${stylist.name}`}
                  className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                    stylist.isAvailableToday ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-xs"></span>
                </button>
                <span className="text-xs text-[#424844] font-medium">
                  {stylist.isAvailableToday ? 'Available Today' : 'Off Schedule'}
                </span>
              </div>

              <button
                onClick={() => onOpenNewBookingWithStylist(stylist.id)}
                className="px-4 py-1.5 rounded-full bg-[#112e20] hover:bg-[#9b4521] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Book Chair
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
