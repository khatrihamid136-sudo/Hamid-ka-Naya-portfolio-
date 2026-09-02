import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, X, KeyRound, ShieldAlert, Eye, EyeOff } from 'lucide-react';

export const PasswordModal: React.FC = () => {
  const { isPasswordPromptOpen, setIsPasswordPromptOpen, verifyAdminPassword } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isPasswordPromptOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyAdminPassword(password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      setPassword('');
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] rounded-3xl border border-[#EDE7DC] shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#141414] text-[#B59E75] flex items-center justify-center mb-4 shadow-sm">
          <KeyRound className="w-7 h-7" />
        </div>

        <h3 className="text-2xl font-extrabold text-[#141414] mb-1 font-display tracking-tight">
          Admin Control Panel
        </h3>

        <p className="text-xs sm:text-sm text-[#736E65] mb-6">
          Enter administrative passcode to manage portfolio projects, image URLs, gallery visuals, categories, and site copy.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoFocus
              placeholder="Enter password (admin123)..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3.5 pr-11 rounded-xl border bg-white text-sm text-[#141414] focus:outline-none transition-all ${
                error
                  ? 'border-red-500 ring-2 ring-red-200'
                  : 'border-[#DED8CC] focus:border-[#B59E75]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8477] hover:text-[#141414] p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-[11px] text-[#8B8477] bg-[#F2EDE2] py-1.5 px-3 rounded-lg border border-[#E5DEC\-D] flex items-center justify-between">
            <span>Default Password:</span>
            <code className="font-mono font-bold text-[#141414] bg-white px-1.5 py-0.5 rounded">admin123</code>
          </div>

          {error && (
            <div className="text-xs font-semibold text-red-600 flex items-center justify-center gap-1.5 animate-shake">
              <ShieldAlert className="w-4 h-4" />
              <span>Incorrect password. Please enter admin123</span>
            </div>
          )}

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsPasswordPromptOpen(false);
                setPassword('');
                setError(false);
              }}
              className="w-1/2 py-3 rounded-full border border-[#D9D3C7] bg-[#F4EFE6] text-xs font-bold text-[#443F37] hover:bg-[#EAE4D7] transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 py-3 rounded-full bg-[#141414] text-white text-xs font-bold hover:bg-[#2A2824] transition-all cursor-pointer shadow-sm"
            >
              Unlock Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
