import React from 'react';
import { Package, Video, ShieldCheck, Download, Sparkles, FileText, Lock } from 'lucide-react';

export default function WhatYouGet({ product }) {
  if (!product) return null;

  const items = [
    {
      icon: Video,
      title: 'Number of Reels',
      value: `${(product.reelsCount || 25000).toLocaleString()}+ Vertical Clips`,
      desc: 'Sorted neatly by niche & topic folders'
    },
    {
      icon: Sparkles,
      title: 'Content Category',
      value: product.category?.replace('-', ' ').toUpperCase() || 'REELS BUNDLE',
      desc: 'Unbranded high virality footage'
    },
    {
      icon: FileText,
      title: 'Video Format',
      value: product.format || 'MP4 9:16 Vertical (1080x1920 / 4K)',
      desc: 'Universal mobile format for CapCut, Premiere, InShot & Canva'
    },
    {
      icon: ShieldCheck,
      title: 'Usage License',
      value: 'Unrestricted Commercial Rights',
      desc: 'Use for personal growth, client work & Meta Ads'
    },
    {
      icon: Download,
      title: 'Delivery Method',
      value: 'Instant Google Drive & Cloud Access',
      desc: 'High-speed 1-click cloud access & zip downloads'
    },
    {
      icon: Lock,
      title: 'Access Duration',
      value: 'Lifetime Access + Free Updates',
      desc: 'No monthly subscriptions or hidden fees'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10 space-y-2">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          What's Included in <span className="text-cyan-400">This Bundle</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Everything delivered automatically instantly after checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="glass-card p-5 rounded-2xl border border-slate-800 flex items-start gap-4 hover:border-cyan-500/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.title}</span>
                <h4 className="text-sm font-extrabold text-white">{item.value}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
