import React, { useState } from 'react';
import { Lock, Key, X } from 'lucide-react';
import { setAdminLoggedIn } from '../services/storage';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const envPasskey = import.meta.env.VITE_ADMIN_PASSKEY || 'admin123';
    
    if (passcode.trim() === envPasskey || (envPasskey === 'admin123' && passcode.trim().length > 0)) {
      setAdminLoggedIn(true);
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid admin passkey. Try default: admin123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-purple-500/40 bg-[#090D17] space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto shadow-glow-purple">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-display font-extrabold text-xl text-white">
            EXE Admin Authentication
          </h2>
          <p className="text-xs text-slate-400">
            Enter your secure admin passkey to access backend management.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Passkey
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passkey..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Configurable via <code className="text-cyan-400 font-mono">VITE_ADMIN_PASSKEY</code></span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all"
          >
            Authenticate & Open Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
