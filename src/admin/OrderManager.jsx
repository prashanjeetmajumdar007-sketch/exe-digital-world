import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { getOrders, formatINR } from '../services/storage';

export default function OrderManager({ onSelectOrder }) {
  const [orders, setOrders] = useState(getOrders());
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.paymentStatus === statusFilter;
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white">
            Orders & <span className="text-cyan-400">Transactions</span> ({orders.length})
          </h2>
          <p className="text-xs text-slate-400">
            Monitor incoming digital purchases, customer contacts, and cloud link delivery status in INR (₹).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, name or email..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
          >
            <option value="all">All Payment Statuses</option>
            <option value="success">Success / Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <p className="text-sm font-semibold">No orders recorded yet.</p>
            <p className="text-xs text-slate-500">Your dashboard is clean and ready for live sales in INR (₹).</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product Purchased</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Delivery Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-900/50">
                    <td className="p-4 font-mono font-bold text-cyan-400">
                      {o.id}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-white block">{o.customerName}</span>
                      <span className="text-[10px] text-slate-400">{o.customerEmail}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-200">
                      {(o.items || []).map(i => i.productName).join(', ') || 'Viral Reels Bundle'}
                    </td>
                    <td className="p-4 font-mono font-extrabold text-white">
                      {formatINR(o.totalAmount)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                        o.paymentStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-[11px]">
                      {new Date(o.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={o.deliveryLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:text-white text-[11px] font-semibold inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Drive Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
