import React, { useState } from 'react';
import { CarouselBanner } from '../types';

interface PromotionsViewProps {
  banners: CarouselBanner[];
  onToggleBanner: (id: string) => void;
  onEditBanner: (banner: CarouselBanner) => void;
  onDeleteBanner: (id: string) => void;
  onOpenAddPromotion: () => void;
}

export const PromotionsView: React.FC<PromotionsViewProps> = ({
  banners,
  onToggleBanner,
  onEditBanner,
  onDeleteBanner,
  onOpenAddPromotion,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const activeCount = banners.filter((b) => b.isActive).length;

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Top Editorial Header & Command Zone */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c2c8c2]/30 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Carousel Promotions
          </h1>
          <p className="text-sm text-[#424844]">
            Manage the hero carousel promotion slides displayed across the client booking portal.
          </p>
        </div>

        <button
          onClick={onOpenAddPromotion}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#112e20] text-white hover:bg-[#284435] transition-colors text-[13px] font-semibold shadow-sm cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          <span>+ Add Carousel Slide</span>
        </button>
      </section>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#c2c8c2]/30 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#e6ede7] text-[#112e20] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">view_carousel</span>
          </div>
          <div>
            <div className="text-xs text-[#727973] uppercase tracking-wider font-semibold">Total Slides</div>
            <div className="text-xl font-bold text-[#112e20]">{banners.length} Slides</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#c2c8c2]/30 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#caead5] text-[#042014] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">visibility</span>
          </div>
          <div>
            <div className="text-xs text-[#727973] uppercase tracking-wider font-semibold">Live on Portal</div>
            <div className="text-xl font-bold text-[#112e20]">{activeCount} Active</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#c2c8c2]/30 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#f0f5f1] text-[#727973] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
          </div>
          <div>
            <div className="text-xs text-[#727973] uppercase tracking-wider font-semibold">Draft / Hidden</div>
            <div className="text-xl font-bold text-[#424844]">{banners.length - activeCount} Hidden</div>
          </div>
        </div>
      </div>

      {/* Website Carousel Banners List */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#112e20]">
              Homepage Carousel Banners
            </h2>
            <p className="text-xs text-[#727973] mt-0.5">
              Edit headlines, privilege tags, or upload new slide artwork anytime.
            </p>
          </div>
          <span className="text-xs text-[#424844] font-medium bg-[#f0f5f1] px-3 py-1 rounded-full border border-[#c2c8c2]/30">
            {banners.length} Curation Slides
          </span>
        </div>

        {banners.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-dashed border-[#c2c8c2] text-center flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#f0f5f1] text-[#112e20] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">photo_library</span>
            </div>
            <h3 className="font-serif text-lg text-[#112e20]">No Carousel Slides Found</h3>
            <p className="text-xs text-[#727973] max-w-sm">
              Add your first carousel promotion banner with uploaded artwork to showcase seasonal rituals on the homepage.
            </p>
            <button
              onClick={onOpenAddPromotion}
              className="mt-2 px-5 py-2 rounded-full bg-[#112e20] text-white text-xs font-semibold hover:bg-[#284435] transition-colors cursor-pointer"
            >
              + Add Promotion Slide
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 border border-[#c2c8c2]/40 hover:border-[#112e20]/30 transition-all hover:shadow-md"
              >
                {/* Left: Thumbnail & Content */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto flex-1">
                  <div className="relative w-full sm:w-48 sm:h-28 aspect-[16/9] sm:aspect-auto rounded-xl overflow-hidden shrink-0 border border-[#c2c8c2]/40 bg-[#08241b] group shadow-inner">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono">
                      Slide #{index + 1}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base text-[#112e20] font-semibold tracking-tight truncate">
                        {banner.title}
                      </h3>
                      {banner.tag && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f0f5f1] text-[#9b4521] border border-[#9b4521]/20">
                          {banner.tag}
                        </span>
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          banner.isActive
                            ? 'bg-[#caead5] text-[#042014]'
                            : 'bg-[#eaefeb] text-[#727973]'
                        }`}
                      >
                        {banner.isActive ? 'Active on Portal' : 'Hidden'}
                      </span>
                    </div>

                    <p className="text-xs text-[#424844] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#9b4521]">
                        schedule
                      </span>
                      <span>{banner.validity}</span>
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-[#727973]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">aspect_ratio</span>
                        <span>Full-width Hero</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">touch_app</span>
                        <span>Interactive Reservation</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-between sm:justify-end w-full lg:w-auto gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#eaefeb] shrink-0">
                  {/* Toggle Active Switch */}
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <button
                      type="button"
                      onClick={() => onToggleBanner(banner.id)}
                      aria-label={`Toggle banner ${banner.title}`}
                      className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                        banner.isActive ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow-xs"></span>
                    </button>
                    <span className="ml-2.5 text-xs text-[#112e20] font-medium min-w-[50px]">
                      {banner.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </label>

                  <div className="h-6 w-px bg-[#c2c8c2]/40 hidden sm:block" />

                  {/* Edit Banner Button */}
                  <button
                    onClick={() => onEditBanner(banner)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0f5f1] hover:bg-[#112e20] text-[#112e20] hover:text-white transition-all text-xs font-semibold cursor-pointer border border-[#c2c8c2]/30 shadow-2xs"
                    title="Edit Carousel Slide"
                  >
                    <span className="material-symbols-outlined text-[15px]">edit</span>
                    <span>Edit Slide</span>
                  </button>

                  {/* Delete Button / Confirmation */}
                  {deleteConfirmId === banner.id ? (
                    <div className="inline-flex items-center gap-1.5 bg-[#ffdad6] p-1 rounded-lg">
                      <span className="text-[11px] font-semibold text-[#410002] px-1">Delete?</span>
                      <button
                        onClick={() => {
                          onDeleteBanner(banner.id);
                          setDeleteConfirmId(null);
                        }}
                        className="px-2 py-0.5 rounded bg-[#ba1a1a] text-white text-[11px] font-bold hover:bg-[#93000a] cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-0.5 rounded bg-white text-[#410002] text-[11px] font-semibold hover:bg-[#f0f5f1] cursor-pointer"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(banner.id)}
                      className="w-8 h-8 rounded-xl border border-[#c2c8c2]/50 dark:border-white/10 bg-white dark:bg-white/5 text-[#424844] dark:text-neutral-300 hover:bg-red-600 hover:text-white hover:border-red-600 dark:hover:bg-red-600 dark:hover:text-white dark:hover:border-red-600 flex items-center justify-center transition-all shadow-2xs cursor-pointer btn-delete-action shrink-0"
                      title="Delete Slide"
                    >
                      <span className="material-symbols-outlined text-[17px] text-current">delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
