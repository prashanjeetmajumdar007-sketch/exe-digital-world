import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Menu, X, LayoutDashboard, Search, Zap } from 'lucide-react';

export default function Navbar({ onNavigate, currentRoute, cartCount = 0, onOpenAdmin, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#05070D]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('/')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-indigo-600 p-[1px] shadow-glow-cyan group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090D16] rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                EXE <span className="text-cyan-400">DIGITAL</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
              Your Digital World, All in One Place
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('/')}
            className={`text-sm font-semibold transition-colors hover:text-cyan-400 ${
              currentRoute === '/' ? 'text-cyan-400 font-bold' : 'text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/reels-bundles')}
            className={`text-sm font-semibold transition-colors hover:text-cyan-400 flex items-center gap-1.5 ${
              currentRoute === '/reels-bundles' ? 'text-cyan-400 font-bold' : 'text-slate-300'
            }`}
          >
            Reels Bundles
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </button>
          <button
            onClick={() => handleNavClick('/best-sellers')}
            className={`text-sm font-semibold transition-colors hover:text-cyan-400 ${
              currentRoute === '/best-sellers' ? 'text-cyan-400 font-bold' : 'text-slate-300'
            }`}
          >
            Best Sellers
          </button>
          <button
            onClick={() => handleNavClick('/contact')}
            className={`text-sm font-semibold transition-colors hover:text-cyan-400 ${
              currentRoute === '/contact' ? 'text-cyan-400 font-bold' : 'text-slate-300'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-all hover:text-white"
            title="Open Admin Dashboard"
          >
            <LayoutDashboard className="w-4 h-4 text-purple-400" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => handleNavClick('/reels-bundles')}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black fill-black/20" />
              Explore Bundles
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5 text-purple-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('/')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-slate-200 hover:bg-slate-800/60"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/reels-bundles')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between"
          >
            <span>Reels Bundles</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500 text-black font-bold">HOT</span>
          </button>
          <button
            onClick={() => handleNavClick('/best-sellers')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-slate-200 hover:bg-slate-800/60"
          >
            Best Sellers
          </button>
          <button
            onClick={() => handleNavClick('/contact')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-slate-200 hover:bg-slate-800/60"
          >
            Contact
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('/reels-bundles')}
              className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-black bg-cyan-400 shadow-glow-cyan flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Explore Reels Bundles
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
