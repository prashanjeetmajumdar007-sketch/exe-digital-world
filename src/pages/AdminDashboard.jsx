import React, { useState } from 'react';
import { LayoutDashboard, Package, Target, MessageSquare, ShoppingBag, LogOut, ArrowLeft, Zap } from 'lucide-react';
import AdminOverview from '../admin/AdminOverview';
import ProductManager from '../admin/ProductManager';
import MetaAdsLandingPages from '../admin/MetaAdsLandingPages';
import ReviewsManager from '../admin/ReviewsManager';
import OrderManager from '../admin/OrderManager';
import { setAdminLoggedIn } from '../services/storage';

export default function AdminDashboard({ onNavigate, onSelectProduct, onPreviewOffer }) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    setAdminLoggedIn(false);
    onNavigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Navigation Header */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
            <Zap className="w-6 h-6 fill-cyan-400/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-xl text-white">
                EXE Admin Control Center
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Manage Products, Meta Ads Landing Pages, Reviews & Sales Analytics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            View Storefront
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-cyan-500 text-black shadow-glow-cyan'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Analytics & Revenue Overview
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-black shadow-glow-cyan'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Package className="w-4 h-4" />
          Product Manager
        </button>

        <button
          onClick={() => setActiveTab('meta-ads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'meta-ads'
              ? 'bg-cyan-500 text-black shadow-glow-cyan'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Target className="w-4 h-4" />
          Meta Ads Landing Pages
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'bg-cyan-500 text-black shadow-glow-cyan'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Reviews Moderation
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-black shadow-glow-cyan'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Orders & Customer Logs
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-2">
        {activeTab === 'overview' && <AdminOverview />}
        {activeTab === 'products' && <ProductManager onSelectProduct={onSelectProduct} />}
        {activeTab === 'meta-ads' && <MetaAdsLandingPages onPreviewOffer={onPreviewOffer} onNavigate={onNavigate} />}
        {activeTab === 'reviews' && <ReviewsManager />}
        {activeTab === 'orders' && <OrderManager />}
      </div>

    </div>
  );
}
