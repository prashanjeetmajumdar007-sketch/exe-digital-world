import React, { useState, useEffect } from 'react';
import { Target, X } from 'lucide-react';
import { formatINR } from '../../services/storage';

export default function MetaPixelToast() {
  const [lastEvent, setLastEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handlePixelEvent = (e) => {
      setLastEvent(e.detail);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('meta_pixel_fired', handlePixelEvent);
    return () => window.removeEventListener('meta_pixel_fired', handlePixelEvent);
  }, []);

  if (!isVisible || !lastEvent) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 animate-bounce-short">
      <div className="glass-panel px-4 py-3 rounded-2xl border border-cyan-500/40 bg-slate-950/90 shadow-glow-cyan flex items-center gap-3 max-w-sm">
        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
          <Target className="w-4 h-4" />
        </div>
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Meta Pixel Fired</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500 text-black font-extrabold">
              {lastEvent.event}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {lastEvent.data.content_name || 'Standard Conversion Event'} ({formatINR(lastEvent.data.value || 0)})
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
