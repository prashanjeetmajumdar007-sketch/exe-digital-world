import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, Check, ExternalLink, CheckCircle2 } from 'lucide-react';
import { getOffers, saveOffer, deleteOffer, getProducts, formatINR } from '../services/storage';

export default function OfferBuilder({ onPreviewOffer }) {
  const [offers, setOffers] = useState(getOffers());
  const [products] = useState(getProducts());
  const [isEditing, setIsEditing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const emptyOffer = {
    id: '',
    name: 'Meta Ads High-Converting Special Offer',
    slug: 'viral-reels-bundle-offer',
    heading: '🔥 MEGA REELS VAULT - LIMITED META ADS OFFER',
    subheading: 'Get Instant Access to 55,000+ 4K Reels Across All High-Converting Niches for 90% OFF Today!',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    productIds: products.slice(0, 2).map(p => p.id),
    offerPrice: 499,
    originalPrice: 6499,
    ctaText: 'UNLOCK ALL REELS NOW (₹499)',
    description: 'Special multi-product offer landing page designed for Instagram Reels & Facebook Meta Ads traffic.',
    benefitsStr: '55,000+ Ready-to-Post 4K Vertical Reels\n100% Unbranded & Commercial License\nInstant Google Drive Download Link',
    status: 'active'
  };

  const [formData, setFormData] = useState(emptyOffer);

  const handleOpenAdd = () => {
    setFormData(emptyOffer);
    setIsEditing(true);
  };

  const handleOpenEdit = (off) => {
    setFormData({
      ...off,
      benefitsStr: (off.benefits || []).join('\n')
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this offer landing page?')) {
      deleteOffer(id);
      setOffers(getOffers());
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const benefitsArr = formData.benefitsStr.split('\n').filter(b => b.trim().length > 0);
    const calculatedDiscount = Math.round(((formData.originalPrice - formData.offerPrice) / formData.originalPrice) * 100);

    const payload = {
      ...formData,
      benefits: benefitsArr,
      discount: isNaN(calculatedDiscount) ? 90 : calculatedDiscount
    };

    saveOffer(payload);
    setOffers(getOffers());
    setIsEditing(false);
  };

  const handleToggleProductSelection = (pId) => {
    const current = formData.productIds || [];
    if (current.includes(pId)) {
      setFormData({ ...formData, productIds: current.filter(id => id !== pId) });
    } else {
      setFormData({ ...formData, productIds: [...current, pId] });
    }
  };

  const copyOfferUrl = (slug, id) => {
    const fullUrl = `${window.location.origin}/offer/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-white">
            Landing Page & <span className="text-cyan-400">Offer Builder</span>
          </h2>
          <p className="text-xs text-slate-400">
            Create custom multi-product offer pages (`/offer/:slug`) ready to paste into Meta Ads manager.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create New Offer Landing Page
        </button>
      </div>

      {/* Editor Form Modal */}
      {isEditing && (
        <div className="glass-panel p-8 rounded-3xl border border-purple-500/40 bg-slate-950/95 space-y-6 shadow-2xl animate-slideDown">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-display font-extrabold text-lg text-white">
              {formData.id ? 'Edit Offer Page' : 'Create Offer Page'}
            </h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Landing Page Internal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">URL Slug (Meta Ads Link) *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. viral-reels or 2-reels-bundle"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-cyan-400 font-mono"
                />
              </div>
            </div>

            {/* Select Products included in this offer */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <label className="block text-xs font-bold uppercase text-slate-300">
                Select Included Products (1, 2, 4, or All)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map(p => {
                  const isSelected = (formData.productIds || []).includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleToggleProductSelection(p.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isSelected ? 'bg-cyan-500/10 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <img src={p.thumbnail} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-xs font-bold truncate">{p.name}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Headline & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Main Heading</label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Subheading</label>
                <input
                  type="text"
                  value={formData.subheading}
                  onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Offer Price (₹)</label>
                <input
                  type="number"
                  value={formData.offerPrice}
                  onChange={(e) => setFormData({ ...formData, offerPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-extrabold shadow-glow-cyan"
              >
                Save & Generate Offer URL
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Offers Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map(off => (
          <div
            key={off.id}
            className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-cyan-500/30 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  META ADS READY
                </span>
                <span className="font-display font-extrabold text-xl text-white">
                  {formatINR(off.offerPrice)} <span className="text-xs text-slate-500 line-through">{formatINR(off.originalPrice || 4999)}</span>
                </span>
              </div>

              <h3 className="font-bold text-white text-base">{off.name}</h3>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 truncate">
                {window.location.origin}/offer/{off.slug}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
              <button
                onClick={() => copyOfferUrl(off.slug, off.id)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                {copiedId === off.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === off.id ? 'Copied Meta Ads Link!' : 'Copy Direct Meta Ads URL'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPreviewOffer(off)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Preview Offer Landing Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOpenEdit(off)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(off.id)}
                  className="p-2 rounded-lg bg-slate-800 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
