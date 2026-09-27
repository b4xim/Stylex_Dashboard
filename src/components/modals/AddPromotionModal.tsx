import React, { useState } from 'react';
import { PromoCode, CarouselBanner } from '../../types';

interface AddPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPromoCode: (promo: PromoCode) => void;
  onAddBanner: (banner: CarouselBanner) => void;
}

export const AddPromotionModal: React.FC<AddPromotionModalProps> = ({
  isOpen,
  onClose,
  onAddPromoCode,
  onAddBanner,
}) => {
  const [promoType, setPromoType] = useState<'code' | 'banner'>('code');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [usageLimit, setUsageLimit] = useState('100');
  const [colorScheme, setColorScheme] = useState<'green' | 'yellow' | 'orange'>('green');

  // Banner fields
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerValidity, setBannerValidity] = useState('Nov 01, 2024 – Dec 15, 2024');
  const [bannerUrl, setBannerUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoType === 'code') {
      if (!code.trim() || !discount.trim()) return;
      onAddPromoCode({
        id: `promo-${Date.now()}`,
        code: code.trim().toUpperCase().replace(/\s+/g, ''),
        discount: discount.trim(),
        totalUses: `0 / ${usageLimit} uses`,
        isActive: true,
        colorScheme,
      });
    } else {
      if (!bannerTitle.trim()) return;
      onAddBanner({
        id: `ban-${Date.now()}`,
        title: bannerTitle.trim(),
        validity: bannerValidity.trim(),
        imageUrl: bannerUrl.trim() || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
        isActive: true,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112e20]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c2c8c2]/50">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaefeb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0f5f1] text-[#112e20] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <span className="text-[11px] text-[#9b4521] uppercase tracking-wider font-bold">
                Promotion Studio
              </span>
              <h3 className="font-serif text-2xl text-[#112e20]">New Atelier Promotion</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#727973] hover:text-[#181d1b] rounded-full hover:bg-[#f0f5f1] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-[#f0f5f1] rounded-lg mt-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPromoType('code')}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              promoType === 'code' ? 'bg-white text-[#112e20] shadow-xs' : 'text-[#424844]'
            }`}
          >
            Client Promo Code
          </button>
          <button
            type="button"
            onClick={() => setPromoType('banner')}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              promoType === 'banner' ? 'bg-white text-[#112e20] shadow-xs' : 'text-[#424844]'
            }`}
          >
            Website Carousel Banner
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {promoType === 'code' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                  Promo Code Wordmark
                </label>
                <input
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. LUXURY2024"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm uppercase tracking-wider font-mono font-bold focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                  Discount Description
                </label>
                <input
                  required
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="e.g. 20% off Balayage or Complimentary Scalp Steam"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#181d1b] mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#181d1b] mb-1">Badge Accent</label>
                  <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
                  >
                    <option value="green">Forest Silk (Green)</option>
                    <option value="yellow">Champagne Gold (Yellow)</option>
                    <option value="orange">Terracotta Rust (Orange)</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                  Banner Campaign Headline
                </label>
                <input
                  required
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  placeholder="e.g. Winter Velvet Balayage & Botanical Steam"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                  Validity Period
                </label>
                <input
                  value={bannerValidity}
                  onChange={(e) => setBannerValidity(e.target.value)}
                  placeholder="e.g. Nov 01, 2024 – Dec 15, 2024"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181d1b] mb-1">
                  Image Asset URL (16:9)
                </label>
                <input
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="Paste image link or leave empty for default"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#424844] hover:bg-[#eaefeb] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#112e20] text-white text-xs font-semibold hover:bg-[#284435] transition-all shadow-md cursor-pointer"
            >
              Publish Promotion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
