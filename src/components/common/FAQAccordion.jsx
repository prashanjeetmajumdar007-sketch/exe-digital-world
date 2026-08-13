import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? 'bg-slate-900/80 border-cyan-500/40 shadow-glow-cyan/10'
                : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left gap-4"
            >
              <span className="font-semibold text-sm sm:text-base text-white flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform ${
                  isOpen ? 'rotate-180 text-cyan-400' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
