import React, { useState } from 'react';
import { ConciergeInquiry } from '../types';

interface ConciergeViewProps {
  inquiries: ConciergeInquiry[];
  onResolveInquiry: (id: string) => void;
  onReplyInquiry: (id: string, replyText: string) => void;
  globalSearchQuery?: string;
}

export const ConciergeView: React.FC<ConciergeViewProps> = ({
  inquiries,
  onResolveInquiry,
  onReplyInquiry,
  globalSearchQuery = '',
}) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = inquiries.filter((inq) => {
    if (!globalSearchQuery) return true;
    const q = globalSearchQuery.toLowerCase();
    return (
      inq.clientName.toLowerCase().includes(q) ||
      inq.serviceRequested.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q)
    );
  });

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;
    onReplyInquiry(id, replyText);
    setReplyText('');
    setActiveReplyId(null);
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c2c8c2]/30 pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#112e20] tracking-tight">
            Concierge Desk
          </h1>
          <p className="text-sm text-[#424844] mt-1">
            Direct VIP guest communications, private buyout inquiries, and custom requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#735c00] text-white text-xs font-bold uppercase tracking-wider">
            {inquiries.filter((i) => i.status === 'Unread').length} Pending Inquiries
          </span>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl p-6 shadow-sm border transition-all ${
              item.status === 'Unread'
                ? 'bg-white border-[#9b4521]/40 ring-1 ring-[#9b4521]/20'
                : item.status === 'In Progress'
                ? 'bg-white border-[#c2c8c2]/40'
                : 'bg-[#f0f5f1]/60 border-[#c2c8c2]/20 opacity-80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#eaefeb]">
              <div className="flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    item.status === 'Unread'
                      ? 'bg-[#9b4521] animate-pulse'
                      : item.status === 'In Progress'
                      ? 'bg-[#ffe088]'
                      : 'bg-emerald-600'
                  }`}
                ></span>
                <span className="font-serif text-xl text-[#112e20] font-semibold">
                  {item.clientName}
                </span>
                {item.clientTier && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#284435]/10 text-[#112e20] font-bold uppercase tracking-wider">
                    {item.clientTier}
                  </span>
                )}
                <span className="text-xs text-[#727973]">{item.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#727973]">{item.timeAgo}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Unread'
                      ? 'bg-[#ffdbcf] text-[#380d00]'
                      : item.status === 'In Progress'
                      ? 'bg-[#ffe088] text-[#241a00]'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#112e20]">
                <span className="text-[#9b4521] uppercase tracking-wider">Inquiry:</span>
                <span>{item.serviceRequested}</span>
                <span className="text-[#727973] font-normal">• Requested {item.preferredDate}</span>
              </div>

              <p className="text-sm text-[#424844] leading-relaxed bg-[#f0f5f1]/50 p-4 rounded-xl border border-[#eaefeb]">
                "{item.message}"
              </p>
            </div>

            {/* Quick reply section */}
            {activeReplyId === item.id ? (
              <div className="mt-4 pt-4 border-t border-[#eaefeb] space-y-3">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your official concierge response (sent via SMS/Email)..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#c2c8c2] text-sm focus:ring-1 focus:ring-[#112e20] outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setActiveReplyId(null)}
                    className="px-4 py-1.5 rounded-full text-xs text-[#424844] hover:bg-[#eaefeb]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendReply(item.id)}
                    className="px-5 py-1.5 rounded-full bg-[#112e20] text-white text-xs font-semibold hover:bg-[#284435] shadow-xs cursor-pointer"
                  >
                    Send Direct Dispatch
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 pt-3 border-t border-[#eaefeb] flex items-center justify-between">
                <span className="text-xs text-[#727973]">
                  Connected to StyleX Private Concierge System
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveReplyId(item.id)}
                    className="px-4 py-1.5 rounded-full bg-[#112e20] hover:bg-[#284435] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reply
                  </button>
                  {item.status !== 'Resolved' && (
                    <button
                      onClick={() => onResolveInquiry(item.id)}
                      className="px-4 py-1.5 rounded-full bg-[#eaefeb] text-[#112e20] hover:bg-[#dfe4e0] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
