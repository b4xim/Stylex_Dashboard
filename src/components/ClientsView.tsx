import React, { useState } from 'react';
import { VIPClient } from '../types';

interface ClientsViewProps {
  clients: VIPClient[];
  onBookClient: (clientName: string, clientPhone: string) => void;
  globalSearchQuery?: string;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  onBookClient,
  globalSearchQuery = '',
}) => {
  const [filterTier, setFilterTier] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (globalSearchQuery || localSearch).toLowerCase().trim();

  const filtered = clients.filter((c) => {
    if (filterTier !== 'all' && c.tier !== filterTier) return false;
    if (!effectiveSearch) return true;
    return (
      c.name.toLowerCase().includes(effectiveSearch) ||
      c.phone.toLowerCase().includes(effectiveSearch) ||
      c.email.toLowerCase().includes(effectiveSearch) ||
      c.favoriteRitual.toLowerCase().includes(effectiveSearch)
    );
  });

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c2c8c2]/30 pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Clients & VIP Directory
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Personalized guest preferences, formula notes, and VIP concierge tier statuses.
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
            placeholder="Search VIP clients, phone, ritual..."
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        {['all', 'VIP Platinum', 'VIP Gold', 'VIP Member'].map((tier) => (
          <button
            key={tier}
            onClick={() => setFilterTier(tier)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterTier === tier
                ? 'bg-[#112e20] text-white shadow-xs'
                : 'bg-[#eaefeb] text-[#181d1b] hover:bg-[#e5e9e6]'
            }`}
          >
            {tier === 'all' ? 'All Clients' : tier}
          </button>
        ))}
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c2c8c2]/30 overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#f0f5f1] text-[#424844] text-[11px] uppercase tracking-wider font-semibold border-b border-[#c2c8c2]/30">
              <th className="py-3.5 px-6">Client</th>
              <th className="py-3.5 px-4">Tier</th>
              <th className="py-3.5 px-4">Preferred Stylist & Favorite Ritual</th>
              <th className="py-3.5 px-4">Visits</th>
              <th className="py-3.5 px-4">Concierge Notes</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaefeb]">
            {filtered.map((client) => (
              <tr key={client.id} className="hover:bg-[#f0f5f1]/50 transition-colors">
                <td className="py-4 px-6 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#112e20] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {client.initials}
                    </div>
                    <div>
                      <div className="text-base font-semibold text-[#112e20]">{client.name}</div>
                      <div className="text-xs text-[#424844]">{client.phone}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 align-middle">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${
                      client.tier === 'VIP Platinum'
                        ? 'bg-[#284435] text-white'
                        : client.tier === 'VIP Gold'
                        ? 'bg-[#ffe088] text-[#241a00]'
                        : 'bg-[#ffdbcf] text-[#380d00]'
                    }`}
                  >
                    {client.tier}
                  </span>
                </td>

                <td className="py-4 px-4 align-middle">
                  <div className="text-sm font-semibold text-[#181d1b]">
                    {client.favoriteRitual}
                  </div>
                  <div className="text-xs text-[#424844] mt-0.5">
                    with {client.preferredStylist}
                  </div>
                </td>

                <td className="py-4 px-4 align-middle">
                  <div className="text-sm font-bold text-[#112e20]">
                    {client.totalVisits} sessions
                  </div>
                  <div className="text-xs text-[#727973]">{client.lastVisit}</div>
                </td>

                <td className="py-4 px-4 align-middle">
                  <div className="text-xs text-[#424844] italic max-w-xs line-clamp-2">
                    {client.notes}
                  </div>
                </td>

                <td className="py-4 px-6 align-middle text-right">
                  <button
                    onClick={() => onBookClient(client.name, client.phone)}
                    className="px-4 py-1.5 rounded-full bg-[#9b4521] text-white hover:bg-[#752906] text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    Book Ritual
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
