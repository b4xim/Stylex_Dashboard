import React, { useState } from 'react';
import { Appointment } from '../../types';

interface CheckoutModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onCompleteCheckout: (appointmentId: string, tipAmount: number, paymentMethod: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  appointment,
  onClose,
  onCompleteCheckout,
}) => {
  const [tipPercent, setTipPercent] = useState<number>(20);
  const [paymentMethod, setPaymentMethod] = useState<'Apple Pay' | 'Credit Card' | 'Cash'>('Credit Card');

  if (!appointment) return null;

  const depositPaid = appointment.depositAmount || 0;
  const balanceDueBeforeTip = Math.max(0, appointment.totalPrice - depositPaid);
  const tipAmount = Math.round((appointment.totalPrice * tipPercent) / 100);
  const finalTotal = balanceDueBeforeTip + tipAmount;

  const handleFinish = () => {
    onCompleteCheckout(appointment.id, tipAmount, paymentMethod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112e20]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#c2c8c2]/50">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaefeb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdbcf] text-[#9b4521] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div>
              <span className="text-[11px] text-[#9b4521] uppercase tracking-wider font-bold">
                Guest Reception Checkout
              </span>
              <h3 className="font-serif text-2xl text-[#112e20]">{appointment.clientName}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#727973] hover:text-[#181d1b] rounded-full hover:bg-[#f0f5f1] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="p-3 rounded-xl bg-[#f0f5f1] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#112e20]">{appointment.serviceName}</span>
              <p className="text-[#424844] mt-0.5">
                Stylist: {appointment.stylistName} • {appointment.station}
              </p>
            </div>
            <span className="font-bold text-sm text-[#112e20]">${appointment.totalPrice}</span>
          </div>

          {/* Ledger calculations */}
          <div className="space-y-2 text-sm text-[#424844] pt-2">
            <div className="flex justify-between">
              <span>Service Total</span>
              <span className="font-medium text-[#181d1b]">${appointment.totalPrice}.00</span>
            </div>
            <div className="flex justify-between text-[#112e20]">
              <span>Deposit Previously Applied</span>
              <span className="font-semibold text-emerald-800">-${depositPaid}.00</span>
            </div>
            <div className="flex justify-between border-t border-[#eaefeb] pt-2 font-medium text-[#181d1b]">
              <span>Remaining Service Balance</span>
              <span>${balanceDueBeforeTip}.00</span>
            </div>
          </div>

          {/* Gratuity */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-[#181d1b] mb-1.5">
              Select Gratuity for {appointment.stylistName}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 18, 20, 25].map((pct) => (
                <button
                  type="button"
                  key={pct}
                  onClick={() => setTipPercent(pct)}
                  className={`py-2 px-2 text-xs rounded-lg font-medium transition-all ${
                    tipPercent === pct
                      ? 'bg-[#112e20] text-white shadow-xs'
                      : 'bg-[#f0f5f1] text-[#181d1b] hover:bg-[#eaefeb]'
                  }`}
                >
                  {pct}% (${Math.round((appointment.totalPrice * pct) / 100)})
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-[#181d1b] mb-1.5">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Apple Pay', 'Credit Card', 'Cash'] as const).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-3 text-xs rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === method
                      ? 'bg-[#9b4521] text-white shadow-xs'
                      : 'bg-[#f0f5f1] text-[#181d1b] hover:bg-[#eaefeb]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {method === 'Apple Pay' ? 'contactless' : method === 'Credit Card' ? 'credit_card' : 'payments'}
                  </span>
                  <span>{method}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Total balance due */}
          <div className="p-4 rounded-xl bg-[#284435] text-white flex items-center justify-between">
            <div>
              <span className="text-xs text-[#aeceba] uppercase tracking-wider font-semibold">
                Amount Due Now
              </span>
              <p className="text-xs text-white/80">Includes ${tipAmount} gratuity</p>
            </div>
            <span className="font-serif text-3xl font-bold">${finalTotal}.00</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#424844] hover:bg-[#eaefeb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-full bg-[#9b4521] text-white text-xs font-semibold hover:bg-[#752906] transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Complete Payment & Release Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
