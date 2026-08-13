import React, { useState } from 'react';
import { DollarSign, TrendingUp, ShoppingBag, Users, Activity, PieChart, Flame, RotateCcw } from 'lucide-react';
import { getAdminAnalytics, resetFinancialData, formatINR } from '../services/storage';

export default function AdminOverview() {
  const [analytics, setAnalytics] = useState(getAdminAnalytics());

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all test sales, order metrics, and revenue to ₹0? Products, demo reels, and reviews will be preserved.')) {
      const resetState = resetFinancialData();
      setAnalytics(resetState);
    }
  };

  const metricsCards = [
    {
      title: 'Total Revenue',
      value: formatINR(analytics.totalRevenue),
      subtitle: `Net Profit: ${formatINR(analytics.totalProfit)}`,
      icon: DollarSign,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      title: "Today's Revenue",
      value: formatINR(analytics.todayRevenue),
      subtitle: 'Live today sales',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: 'This Month Revenue',
      value: formatINR(analytics.thisMonthRevenue),
      subtitle: 'Monthly accumulated revenue',
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders,
      subtitle: `${analytics.successfulOrdersCount} Paid • ${analytics.pendingOrdersCount} Pending`,
      icon: ShoppingBag,
      color: 'text-gold',
      bgColor: 'bg-gold/10 border-gold/30'
    },
    {
      title: 'Total Customers',
      value: analytics.totalCustomers,
      subtitle: 'Unique verified buyers',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      title: 'Average Order Value (AOV)',
      value: formatINR(analytics.avgOrderValue),
      subtitle: 'Per completed transaction',
      icon: PieChart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10 border-pink-500/30'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Dashboard Title & Reset Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white">
            Analytics Overview & <span className="text-cyan-400">Revenue Performance (INR ₹)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time telemetry tracking Meta Ads conversions, product orders, and net revenue in Indian Rupees (₹).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetData}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Reset test sales & orders to zero"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Sales Data to ₹0
          </button>
        </div>
      </div>

      {/* 6 Key Analytics Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${card.bgColor}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>

              <div>
                <span className="font-display font-extrabold text-3xl text-white">
                  {card.value}
                </span>
                <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Best Seller & Revenue vs Profit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales Chart Graphic (SVG Visualizer) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-white">Revenue & Sales Velocity (INR ₹)</h3>
              <p className="text-xs text-slate-400">Daily breakdown for Meta Ads campaign ROI</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Live INR Analytics
            </span>
          </div>

          {/* Simulated SVG Trend Chart */}
          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800 relative">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-700 w-full"></div>
              <div className="border-b border-slate-700 w-full"></div>
              <div className="border-b border-slate-700 w-full"></div>
            </div>

            {[
              { day: 'Mon', height: analytics.totalRevenue > 0 ? '40%' : '5%', val: formatINR(analytics.totalRevenue > 0 ? 4200 : 0) },
              { day: 'Tue', height: analytics.totalRevenue > 0 ? '65%' : '5%', val: formatINR(analytics.totalRevenue > 0 ? 6800 : 0) },
              { day: 'Wed', height: analytics.totalRevenue > 0 ? '55%' : '5%', val: formatINR(analytics.totalRevenue > 0 ? 5900 : 0) },
              { day: 'Thu', height: analytics.totalRevenue > 0 ? '85%' : '5%', val: formatINR(analytics.totalRevenue > 0 ? 9400 : 0) },
              { day: 'Fri', height: analytics.totalRevenue > 0 ? '70%' : '5%', val: formatINR(analytics.totalRevenue > 0 ? 7800 : 0) },
              { day: 'Sat', height: analytics.totalRevenue > 0 ? '95%' : '5%', val: formatINR(analytics.totalRevenue > 0 ? 12500 : 0) },
              { day: 'Sun', height: analytics.totalRevenue > 0 ? '90%' : '5%', val: formatINR(analytics.totalRevenue > 0 ? 11000 : 0) },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                <span className="text-[10px] text-cyan-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.val}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-cyan-500 to-purple-600 rounded-t-xl group-hover:brightness-125 transition-all shadow-glow-cyan/20"
                  style={{ height: bar.height }}
                ></div>
                <span className="text-[10px] text-slate-400 font-semibold">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-cyan-400 inline-block"></span>
              Gross Revenue (₹)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-purple-500 inline-block"></span>
              Net Profit (₹)
            </span>
          </div>
        </div>

        {/* Product Sales Breakdown & Best Seller Card */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Best Seller Box */}
          <div className="glass-panel p-6 rounded-3xl border border-gold/40 bg-gradient-to-br from-slate-950 via-gold/5 to-slate-950 space-y-3 shadow-glow-gold/10">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-gold fill-gold" />
              <span className="text-xs font-bold text-gold uppercase tracking-wider">
                Best Selling Product
              </span>
            </div>
            <h4 className="font-display font-extrabold text-lg text-white">
              {analytics.bestSellingProduct}
            </h4>
            <p className="text-xs text-slate-300">
              Highest conversion rate on Meta Ads traffic.
            </p>
          </div>

          {/* Product Sales Map */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Product Revenue Breakdown (₹)
            </h4>

            <div className="space-y-3 text-xs">
              {Object.entries(analytics.productSalesMap).length === 0 ? (
                <p className="text-slate-500">No recorded product sales yet. Dashboard is clean for production.</p>
              ) : (
                Object.entries(analytics.productSalesMap).map(([pName, rev], idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="truncate max-w-[180px] font-medium">{pName}</span>
                      <span className="font-bold text-cyan-400 font-mono">{formatINR(rev)}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${Math.min(100, (rev / analytics.totalRevenue) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
