import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Zap } from 'lucide-react';

const RECENT_BUYERS = [
  { name: 'Michael K.', location: 'Texas, USA', product: '25,000+ Viral Reels Bundle HD 4K', time: '2 minutes ago' },
  { name: 'Chloe B.', location: 'London, UK', product: '10,000+ AI Avatar & Luxury Reels', time: '5 minutes ago' },
  { name: 'Devon S.', location: 'Sydney, Australia', product: 'Mega Reels All-In-One Offer', time: '8 minutes ago' },
  { name: 'Aarav M.', location: 'Mumbai, India', product: '15,000+ Business Motivation Vault', time: '12 minutes ago' }
];

export default function SocialProofToast() {
  const [buyerIndex, setBuyerIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setBuyerIndex((prev) => (prev + 1) % RECENT_BUYERS.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 12000);

    // Show initial toast after 3s
    const initialTimer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 3000);

    return () => {
      clearInterval(showInterval);
      clearTimeout(initialTimer);
    };
  }, []);

  if (!visible) return null;

  const current = RECENT_BUYERS[buyerIndex];

  return (
    <div className="fixed bottom-6 left-4 z-40 animate-slideUp hidden sm:block">
      <div className="glass-panel p-3.5 rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-2xl flex items-center gap-3 max-w-xs">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-cyan-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white">{current.name}</span>
            <span className="text-[10px] text-slate-400">({current.location})</span>
          </div>
          <p className="text-[11px] text-cyan-400 font-medium truncate max-w-[190px]">
            Purchased {current.product}
          </p>
          <span className="text-[9px] text-slate-400 flex items-center gap-1">
            <CheckCircle className="w-2.5 h-2.5 text-emerald-400 inline" />
            Verified Purchase • {current.time}
          </span>
        </div>
      </div>
    </div>
  );
}
