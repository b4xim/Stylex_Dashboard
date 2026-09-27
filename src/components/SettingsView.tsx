import React, { useState } from 'react';
import { SalonSettings } from '../types';

interface SettingsViewProps {
  settings: SalonSettings;
  onSave: (newSettings: SalonSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<SalonSettings>({ ...settings });

  const handleDiscard = () => {
    setFormData({ ...settings });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c2c8c2]/30">
        <div className="flex flex-col">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Atelier Settings
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Manage core salon profile, deposit rules, and automated guest reminders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDiscard}
            className="px-5 py-2.5 rounded-full text-[#424844] hover:bg-[#eaefeb] hover:text-[#181d1b] text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9b4521] text-white text-[13px] font-semibold shadow-sm hover:bg-[#752906] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl flex flex-col gap-6">
        {/* Salon Details */}
        <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 border border-[#c2c8c2]/30">
          <div className="flex items-center gap-3 pb-2 border-b border-[#c2c8c2]/30">
            <span className="material-symbols-outlined text-[#112e20] text-[22px]">storefront</span>
            <div className="flex flex-col">
              <h2 className="text-base text-[#112e20] font-semibold">Salon Details</h2>
              <span className="text-xs text-[#424844]">
                Visible on booking receipts and confirmations
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs text-[#181d1b] font-medium">Salon Name</label>
              <input
                value={formData.salonName}
                onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/30 text-[#181d1b] text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none transition-all"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#181d1b] font-medium">Phone Number</label>
              <input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/30 text-[#181d1b] text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none transition-all"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#181d1b] font-medium">Concierge Email</label>
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/30 text-[#181d1b] text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none transition-all"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs text-[#181d1b] font-medium">Address</label>
              <input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#f0f5f1] border border-[#c2c8c2]/30 text-[#181d1b] text-sm focus:bg-white focus:ring-1 focus:ring-[#112e20] outline-none transition-all"
                type="text"
              />
            </div>
          </div>
        </section>

        {/* Booking Policy */}
        <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 border border-[#c2c8c2]/30">
          <div className="flex items-center gap-3 pb-2 border-b border-[#c2c8c2]/30">
            <span className="material-symbols-outlined text-[#112e20] text-[22px]">lock_clock</span>
            <div className="flex flex-col">
              <h2 className="text-base text-[#112e20] font-semibold">Booking Policy</h2>
              <span className="text-xs text-[#424844]">
                Deposit rules and client cancellation parameters
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-1">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#f0f5f1]">
              <div className="flex flex-col pr-4">
                <span className="text-[13px] text-[#112e20] font-semibold">
                  Require 25% Online Deposit
                </span>
                <span className="text-xs text-[#424844] mt-0.5">
                  Clients pay 25% upfront upon booking via card or Apple Pay to hold reservation.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    requireOnlineDeposit: !formData.requireOnlineDeposit,
                  })
                }
                aria-label="Toggle 25% Online Deposit"
                className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                  formData.requireOnlineDeposit ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#f0f5f1]">
              <div className="flex flex-col pr-4">
                <span className="text-[13px] text-[#112e20] font-semibold">
                  24h Reschedule Policy
                </span>
                <span className="text-xs text-[#424844] mt-0.5">
                  Complimentary changes up to 24h prior. Late cancellations forfeit deposit.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    reschedulePolicy24h: !formData.reschedulePolicy24h,
                  })
                }
                aria-label="Toggle 24h Reschedule Policy"
                className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                  formData.reschedulePolicy24h ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 border border-[#c2c8c2]/30">
          <div className="flex items-center gap-3 pb-2 border-b border-[#c2c8c2]/30">
            <span className="material-symbols-outlined text-[#112e20] text-[22px]">
              mark_chat_read
            </span>
            <div className="flex flex-col">
              <h2 className="text-base text-[#112e20] font-semibold">Notifications</h2>
              <span className="text-xs text-[#424844]">
                Automated client reminders and calendar sync
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-1">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#f0f5f1]">
              <div className="flex flex-col pr-4">
                <span className="text-[13px] text-[#112e20] font-semibold">
                  WhatsApp & SMS Reminders
                </span>
                <span className="text-xs text-[#424844] mt-0.5">
                  Send 24-hour appointment reminder and directions via SMS and WhatsApp.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    smsWhatsappReminders: !formData.smsWhatsappReminders,
                  })
                }
                aria-label="Toggle WhatsApp & SMS Reminders"
                className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                  formData.smsWhatsappReminders ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#f0f5f1]">
              <div className="flex flex-col pr-4">
                <span className="text-[13px] text-[#112e20] font-semibold">
                  Email Calendar Invites
                </span>
                <span className="text-xs text-[#424844] mt-0.5">
                  Attach .ics calendar invite to booking confirmation email.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    emailCalendarInvites: !formData.emailCalendarInvites,
                  })
                }
                aria-label="Toggle Email Calendar Invites"
                className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                  formData.emailCalendarInvites ? 'bg-[#112e20] justify-end' : 'bg-[#c2c8c2] justify-start'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
