import React from 'react';
import { Zap, ShieldCheck, Download, CreditCard, Sparkles, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#030509] border-t border-slate-800/80 pt-16 pb-12 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800/60">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <Download className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Instant Download</h4>
              <p className="text-[11px] text-slate-400">1-Click Cloud Access</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Secure Payment</h4>
              <p className="text-[11px] text-slate-400">256-Bit SSL Encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <Sparkles className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Commercial License</h4>
              <p className="text-[11px] text-slate-400">Unrestricted Usage</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <CreditCard className="w-6 h-6 text-gold shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Lifetime Access</h4>
              <p className="text-[11px] text-slate-400">No Monthly Subscriptions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-black font-extrabold shadow-glow-cyan">
                <Zap className="w-5 h-5 fill-black" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                EXE <span className="text-cyan-400">DIGITAL WORLD</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Digital World, All in One Place. Providing top-grade viral Reels bundles, templates, e-books, and digital marketing tools designed for maximum conversion.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Meta Ads Compliant
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-cyan-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/reels-bundles')} className="hover:text-cyan-400 transition-colors">
                  Reels Bundles Vault
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/best-sellers')} className="hover:text-cyan-400 transition-colors">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/offer/viral-reels')} className="hover:text-cyan-400 transition-colors text-purple-300 font-semibold">
                  Meta Ads Special Offers 🔥
                </button>
              </li>
            </ul>
          </div>

          {/* Future Scalability Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-cyan-400 font-semibold">Viral Reels Bundles</li>
              <li className="text-slate-400">T-Shirt Bundles (Coming Soon)</li>
              <li className="text-slate-400">E-Books & Playbooks (Coming Soon)</li>
              <li className="text-slate-400">Video Courses (Coming Soon)</li>
              <li className="text-slate-400">Canva & Premiere Templates</li>
              <li className="text-slate-400">Digital Software & Scripts</li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Support & Trust</h4>
            <p className="text-xs text-slate-400 mb-3">
              Need assistance with your download or billing? Our support team is online 24/7.
            </p>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 font-mono">support@exedigitalworld.com</p>
              <p className="text-slate-400">Response time: &lt; 15 minutes</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} EXE DIGITAL WORLD. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">Refund Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">DMCA Notice</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
