import React, { useState } from 'react';
import { DaySchedule, BlackoutDate } from '../types';

interface ScheduleViewProps {
  weekSchedule: DaySchedule[];
  blackoutDates: BlackoutDate[];
  isEngineActive: boolean;
  onToggleEngine: () => void;
  onToggleDay: (index: number) => void;
  onOpenAddBlackout: () => void;
  onDeleteBlackout: (id: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  weekSchedule,
  blackoutDates,
  isEngineActive,
  onToggleEngine,
  onToggleDay,
  onOpenAddBlackout,
  onDeleteBlackout,
}) => {
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
  const [editingHours, setEditingHours] = useState('');

  const handleStartEdit = (index: number, currentHours: string) => {
    setEditingDayIndex(index);
    setEditingHours(currentHours);
  };

  const handleSaveEdit = (index: number) => {
    weekSchedule[index].hours = editingHours;
    setEditingDayIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pt-2 pb-12 flex flex-col gap-8">
      {/* Top Header & Master Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#c2c8c2]/30">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Schedule Control
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Manage standard atelier operating hours and scheduled closures.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-[#c2c8c2]/30 shadow-xs">
          <span className="text-[13px] font-semibold text-[#112e20] select-none">
            Accepting Public Bookings
          </span>
          <button
            onClick={onToggleEngine}
            aria-label="Toggle Public Bookings"
            className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
              isEngineActive ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
          </button>
        </div>
      </div>

      {/* Weekly Working Hours Card */}
      <div className="bg-white rounded-2xl border border-[#c2c8c2]/30 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-5 border-b border-[#c2c8c2]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f0f5f1] flex items-center justify-center text-[#112e20]">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#112e20] leading-tight">
                Weekly Working Hours
              </h2>
              <span className="text-xs text-[#424844]">
                Default operational schedule for clients & artisans
              </span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#eaefeb]">
          {weekSchedule.map((day, idx) => (
            <div
              key={day.dayName}
              className="flex items-center justify-between py-4 px-2 hover:bg-[#f0f5f1]/50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4 w-44">
                <span className="text-base font-semibold text-[#112e20]">{day.dayName}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    day.isOpen
                      ? 'bg-[#caead5] text-[#042014]'
                      : 'bg-[#eaefeb] text-[#424844]'
                  }`}
                >
                  {day.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>

              {editingDayIndex === idx ? (
                <div className="flex items-center gap-2 flex-1 max-w-xs">
                  <input
                    value={editingHours}
                    onChange={(e) => setEditingHours(e.target.value)}
                    className="px-2 py-1 text-sm border border-[#c2c8c2] rounded bg-white w-full"
                  />
                  <button
                    onClick={() => handleSaveEdit(idx)}
                    className="px-2 py-1 bg-[#112e20] text-white text-xs rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div
                  className={`text-sm ${
                    day.isOpen
                      ? 'text-[#112e20] font-medium'
                      : 'text-[#424844] italic'
                  }`}
                >
                  {day.hours}
                </div>
              )}

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onToggleDay(idx)}
                  aria-label={`Toggle hours for ${day.dayName}`}
                  className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                    day.isOpen ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
                <button
                  onClick={() => handleStartEdit(idx, day.hours)}
                  className="p-2 rounded-lg text-[#727973] hover:text-[#112e20] hover:bg-[#eaefeb] transition-colors cursor-pointer"
                  title="Edit Hours"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Blackout Dates Card */}
      <div className="bg-white rounded-2xl border border-[#c2c8c2]/30 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#c2c8c2]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f0f5f1] flex items-center justify-center text-[#112e20]">
              <span className="material-symbols-outlined text-[22px]">event_busy</span>
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#112e20] leading-tight">
                Upcoming Blackout Dates
              </h2>
              <span className="text-xs text-[#424844]">
                Specific closure dates and buyout sessions
              </span>
            </div>
          </div>

          <button
            onClick={onOpenAddBlackout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaefeb] text-[#112e20] hover:bg-[#112e20] hover:text-white text-[13px] font-semibold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Blackout Date</span>
          </button>
        </div>

        <div className="divide-y divide-[#eaefeb]">
          {blackoutDates.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 font-bold ${
                    item.month === 'OCT'
                      ? 'bg-[#ffdbcf] text-[#380d00]'
                      : 'bg-[#caead5] text-[#042014]'
                  }`}
                >
                  <span className="text-[10px] uppercase -mb-0.5 tracking-wider">{item.month}</span>
                  <span className="text-base font-serif">{item.day}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-[#112e20]">{item.title}</span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-[#9b4521]/15 text-[#9b4521] font-medium">
                      {item.timeRange}
                    </span>
                  </div>
                  <p className="text-sm text-[#424844] mt-0.5">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => onDeleteBlackout(item.id)}
                  className="p-1.5 rounded-lg text-[#727973] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-all cursor-pointer"
                  title="Remove Blackout"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
