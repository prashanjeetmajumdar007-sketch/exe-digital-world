import React, { useState } from 'react';
import { Star, Plus, Trash2, CheckCircle2, Eye, EyeOff, MessageSquare, ShieldCheck } from 'lucide-react';
import { getReviews, saveReview, deleteReview, getProducts } from '../services/storage';

export default function ReviewsManager() {
  const [reviews, setReviews] = useState(getReviews());
  const [products] = useState(getProducts());
  const [isEditing, setIsEditing] = useState(false);

  const emptyReview = {
    id: '',
    productId: products[0]?.id || '',
    customerName: 'Marcus Vance',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    starRating: 5,
    reviewText: 'Exploded my account reach overnight!',
    date: new Date().toISOString().split('T')[0],
    isVerified: true,
    status: 'published'
  };

  const [formData, setFormData] = useState(emptyReview);

  const handleOpenAdd = () => {
    setFormData(emptyReview);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this customer review?')) {
      deleteReview(id);
      setReviews(getReviews());
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    saveReview(formData);
    setReviews(getReviews());
    setIsEditing(false);
  };

  const handleToggleStatus = (rev) => {
    const nextStatus = rev.status === 'published' ? 'hidden' : 'published';
    saveReview({ ...rev, status: nextStatus });
    setReviews(getReviews());
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-white">
            Customer Reviews Management <span className="text-cyan-400">({reviews.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Add, verify, and moderate creator reviews displayed across product landing pages.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Custom Review
        </button>
      </div>

      {isEditing && (
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 space-y-6 shadow-2xl animate-slideDown">
          <h3 className="font-bold text-white text-base">Add / Edit Customer Review</h3>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Star Rating (1 - 5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.starRating}
                  onChange={(e) => setFormData({ ...formData, starRating: parseInt(e.target.value) || 5 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Customer Photo URL</label>
                <input
                  type="url"
                  value={formData.customerPhoto}
                  onChange={(e) => setFormData({ ...formData, customerPhoto: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-800 text-cyan-400"
                  />
                  Verified Purchase Badge
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Review Text *</label>
              <textarea
                rows={3}
                required
                value={formData.reviewText}
                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-cyan-400 text-black text-xs font-bold rounded-xl">Save Review</button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review Snippet</th>
              <th className="p-4">Badge</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {reviews.map(r => (
              <tr key={r.id} className="hover:bg-slate-900/50">
                <td className="p-4 flex items-center gap-3">
                  <img src={r.customerPhoto} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-white block">{r.customerName}</span>
                    <span className="text-[10px] text-slate-500">{r.date}</span>
                  </div>
                </td>
                <td className="p-4 font-bold text-gold">
                  ★ {r.starRating}.0
                </td>
                <td className="p-4 max-w-xs truncate text-slate-300">
                  "{r.reviewText}"
                </td>
                <td className="p-4">
                  {r.isVerified ? (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Verified Purchase
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Regular</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    r.status === 'published' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleToggleStatus(r)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  >
                    {r.status === 'published' ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 rounded-lg bg-slate-800 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
