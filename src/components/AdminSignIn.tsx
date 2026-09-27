import React, { useState } from 'react';

interface AdminSignInProps {
  onSignInSuccess: () => void;
  onCancel?: () => void;
}

export const AdminSignIn: React.FC<AdminSignInProps> = ({ onSignInSuccess, onCancel }) => {
  const [email, setEmail] = useState('admin@stylexsalon.com');
  const [password, setPassword] = useState('stylex2024');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f6faf7] flex items-center justify-center p-6 antialiased">
      <main className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-[#c2c8c2]/40 relative">
          {onCancel && (
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-[#727973] hover:text-[#181d1b] p-1.5 rounded-full hover:bg-[#f0f5f1] transition-colors"
              title="Return to Atelier"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#caead5]/50 text-[#112e20] mb-2">
              <span className="material-symbols-outlined text-[22px]">spa</span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#9b4521] font-bold mb-1">
              StyleX Atelier
            </p>
            <h1 className="font-serif text-3xl text-[#112e20] font-medium tracking-tight">
              Admin Sign In
            </h1>
            <p className="text-sm text-[#424844] mt-1">
              Enter your credentials to access atelier management
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#181d1b] mb-1.5" htmlFor="email-address">
                Email Address
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#424844]">
                  <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                </div>
                <input
                  required
                  id="email-address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@stylexsalon.com"
                  className="block w-full pl-11 pr-4 py-3 text-sm rounded-lg bg-[#f0f5f1] text-[#181d1b] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#9b4521] border border-transparent focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#181d1b]" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to registered atelier master email.")}
                  className="text-xs text-[#9b4521] hover:text-[#752906] transition-colors cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#424844]">
                  <span className="material-symbols-outlined text-[18px]">key</span>
                </div>
                <input
                  required
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-11 pr-11 py-3 text-sm rounded-lg bg-[#f0f5f1] text-[#181d1b] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#9b4521] border border-transparent focus:border-transparent tracking-widest transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#424844] hover:text-[#181d1b] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#9b4521] hover:bg-[#752906] text-white py-3.5 px-6 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform active:scale-[0.99] transition-all cursor-pointer group disabled:opacity-75"
              >
                <span>{isLoading ? 'Verifying Atelier Access...' : 'Sign In'}</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[#eaefeb] text-center">
            <p className="text-xs text-[#727973]">
              StyleX Signature Salon • Private Staff Portal
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
