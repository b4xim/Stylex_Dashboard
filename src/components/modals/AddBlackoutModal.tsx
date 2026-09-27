import React, { useState } from 'react';
import { BlackoutDate } from '../../types';

interface AddBlackoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlackout: (item: BlackoutDate) => void;
}

export const AddBlackoutModal: React.FC<AddBlackoutModalProps> = ({
  isOpen,
  onClose,
  onAddBlackout,
}) => {
  const [title, setTitle] = useState('');
  const [month, setMonth] = useState('NOV');
  const [day, setDay] = useState('15');
  const [timeRange, setTimeRange] = useState('All Day');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddBlackout({
      id: `bo-${Date.now()}`,
      month: month.toUpperCase().slice(0, 3),
      day: day.padStart(2, '0'),
      title: title.trim(),
      timeRange: timeRange.trim() || 'All Day',
      description: description.trim() || 'Scheduled atelier blackout.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112e20]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c2c8c2]/50">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaefeb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdbcf] text-[#9b4521] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">event_busy</span>
            </div>
            <div>
              <span className="text-[11px] text-[#9b4521] uppercase tracking-wider font-bold">
                Calendar Schedule Override
              </span>
              <h3 className="font-serif text-2xl text-[#112e20]">Add Blackout Date</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#727973] hover:text-[#181d1b] rounded-full hover:bg-[#f0f5f1] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#181d1b] mb-1">
              Event / Closure Reason
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. VIP Private Gala Buyout"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              >
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map(
                  (m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">Day</label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1">Duration</label>
              <input
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                placeholder="All Day"
                className="w-full px-3 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#181d1b] mb-1">Details & Policy</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Private floor event; public reservations closed."
              className="w-full px-3.5 py-2 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/40 text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none"
            />
          </div>

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
              Set Blackout Override
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
