import React from 'react';
import { PromoCode, CarouselBanner } from '../types';

interface PromotionsViewProps {
  banners: CarouselBanner[];
  promoCodes: PromoCode[];
  onToggleBanner: (id: string) => void;
  onTogglePromo: (id: string) => void;
  onOpenAddPromotion: () => void;
}

export const PromotionsView: React.FC<PromotionsViewProps> = ({
  banners,
  promoCodes,
  onToggleBanner,
  onTogglePromo,
  onOpenAddPromotion,
}) => {
  return (
    <div className="flex flex-col w-full gap-8">
      {/* Top Editorial Header & Command Zone */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c2c8c2]/30 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Promotions
          </h1>
          <p className="text-sm text-[#424844]">
            Manage active homepage carousel banners and client discount codes.
          </p>
        </div>

        <button
          onClick={onOpenAddPromotion}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#112e20] text-white hover:bg-[#9b4521] transition-colors text-[13px] font-semibold shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>+ New Promotion</span>
        </button>
      </section>

      {/* Section 1: Website Carousel Banners */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl text-[#112e20]">
            Website Carousel Banners
          </h2>
          <span className="text-xs text-[#424844]">{banners.length} active banner</span>
        </div>

        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-[#c2c8c2]/30"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-32 h-20 rounded-lg object-cover shrink-0 border border-[#c2c8c2]/30"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base text-[#112e20] font-semibold">{banner.title}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      banner.isActive
                        ? 'bg-[#284435] text-white'
                        : 'bg-[#eaefeb] text-[#424844]'
                    }`}
                  >
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-[#424844] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#9b4521]">
                    event
                  </span>
                  <span>Validity: {banner.validity}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end md:self-auto shrink-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <button
                  type="button"
                  onClick={() => onToggleBanner(banner.id)}
                  aria-label={`Toggle banner ${banner.title}`}
                  className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                    banner.isActive ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
                <span className="ml-2 text-[13px] text-[#112e20] font-medium">
                  {banner.isActive ? 'Active' : 'Hidden'}
                </span>
              </label>
              <button
                onClick={onOpenAddPromotion}
                className="p-2 text-[#424844] hover:text-[#112e20] rounded-full hover:bg-[#eaefeb] transition-colors cursor-pointer"
                title="Edit Banner"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Section 2: Active Promo Codes Table */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl text-[#112e20]">Active Promo Codes</h2>
          <span className="text-xs text-[#424844]">{promoCodes.length} active codes</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#c2c8c2]/30">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f0f5f1] text-[#424844] text-[11px] uppercase tracking-wider font-semibold border-b border-[#c2c8c2]/30 select-none">
                <th className="py-3 px-6">Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Total Uses</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaefeb]">
              {promoCodes.map((promo) => {
                const getBadgeStyle = () => {
                  if (promo.colorScheme === 'green') return 'bg-[#caead5] text-[#042014]';
                  if (promo.colorScheme === 'yellow') return 'bg-[#ffe088] text-[#241a00]';
                  return 'bg-[#ffdbcf] text-[#380d00]';
                };

                return (
                  <tr key={promo.id} className="hover:bg-[#f0f5f1]/50 transition-colors">
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider inline-block ${getBadgeStyle()}`}
                      >
                        {promo.code}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#112e20] font-medium">
                      {promo.discount}
                    </td>
                    <td className="py-4 px-4 text-sm text-[#424844]">
                      {promo.totalUses}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <button
                          type="button"
                          onClick={() => onTogglePromo(promo.id)}
                          aria-label={`Toggle promo code ${promo.code}`}
                          className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                            promo.isActive ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full bg-white shadow-xs"></span>
                        </button>
                        <span className="ml-2 text-xs text-[#112e20] font-medium">
                          {promo.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </label>
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
