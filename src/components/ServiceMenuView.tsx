import React, { useState } from 'react';
import { ServiceItem } from '../types';

interface ServiceMenuViewProps {
  services: ServiceItem[];
  onToggleVisibility: (id: string) => void;
  onOpenAddService: () => void;
  onEditService: (service: ServiceItem) => void;
  onDeleteService: (id: string) => void;
  globalSearchQuery?: string;
}

export const ServiceMenuView: React.FC<ServiceMenuViewProps> = ({
  services,
  onToggleVisibility,
  onOpenAddService,
  onEditService,
  onDeleteService,
  globalSearchQuery = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'spa'>('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (globalSearchQuery || localSearch).toLowerCase().trim();

  const filteredServices = services.filter((svc) => {
    if (activeCategory !== 'all' && svc.category !== activeCategory) {
      return false;
    }
    if (!effectiveSearch) return true;
    return (
      svc.name.toLowerCase().includes(effectiveSearch) ||
      svc.description.toLowerCase().includes(effectiveSearch)
    );
  });

  return (
    <div className="flex flex-col w-full">
      {/* Streamlined Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Service Menu
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Manage your salon services, timing, pricing, and online availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64 sm:w-72">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#424844] text-[18px]">
              search
            </span>
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-[#181d1b] placeholder:text-[#424844] text-sm outline-none shadow-xs focus:ring-1 focus:ring-[#112e20] border border-[#c2c8c2]/40"
              placeholder="Search services..."
              type="text"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-2.5 text-[#727973] hover:text-[#181d1b]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <button
            onClick={onOpenAddService}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9b4521] text-white text-[13px] font-semibold shadow-sm hover:bg-[#752906] transition-all hover:-translate-y-0.5 active:translate-y-0 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Service</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2 rounded-full text-[13px] font-medium shadow-xs transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#112e20] text-white'
              : 'bg-[#eaefeb] text-[#181d1b] hover:bg-[#e5e9e6]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('hair')}
          className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
            activeCategory === 'hair'
              ? 'bg-[#112e20] text-white shadow-xs'
              : 'bg-[#eaefeb] text-[#181d1b] hover:bg-[#e5e9e6]'
          }`}
        >
          Hair
        </button>
        <button
          onClick={() => setActiveCategory('spa')}
          className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
            activeCategory === 'spa'
              ? 'bg-[#112e20] text-white shadow-xs'
              : 'bg-[#eaefeb] text-[#181d1b] hover:bg-[#e5e9e6]'
          }`}
        >
          Spa & Wellness
        </button>
      </div>

      {/* Clean Service Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c2c8c2]/30 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#f0f5f1] border-b border-[#c2c8c2]/30 text-[#424844] text-[11px] uppercase tracking-wider font-semibold select-none">
          <div className="col-span-6">Service</div>
          <div className="col-span-2 text-center">Duration</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-1 text-center">Show on Website</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Items List */}
        <div className="divide-y divide-[#eaefeb]">
          {filteredServices.length === 0 ? (
            <div className="p-8 text-center text-[#727973] text-sm">
              No services found matching your criteria.
            </div>
          ) : (
            filteredServices.map((svc) => (
              <div
                key={svc.id}
                className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-[#f0f5f1]/40 transition-colors"
              >
                <div className="col-span-6 flex flex-col">
                  <span className="text-base text-[#112e20] font-semibold">
                    {svc.name}
                  </span>
                  <span className="text-xs text-[#424844] mt-0.5 leading-relaxed">
                    {svc.description}
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-1.5 text-[#181d1b] text-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#424844]">
                    schedule
                  </span>
                  <span>{svc.durationMin} min</span>
                </div>

                <div className="col-span-2 text-center text-lg text-[#112e20] font-bold">
                  ${svc.price}
                </div>

                <div className="col-span-1 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onToggleVisibility(svc.id)}
                    aria-label={`Toggle visibility of ${svc.name}`}
                    className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                      svc.showOnWebsite ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                  </button>
                </div>

                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEditService(svc)}
                    className="p-2 rounded-full text-[#424844] hover:text-[#112e20] hover:bg-[#eaefeb] transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteService(svc.id)}
                    className="p-2 rounded-full text-[#424844] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
