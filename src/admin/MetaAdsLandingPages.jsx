import React, { useState } from 'react';
import { Target, Plus, Edit2, Trash2, Copy, Check, ExternalLink, Sparkles, Flame, CheckCircle2, Eye, EyeOff, Layers, Zap } from 'lucide-react';
import { getOffers, saveOffer, deleteOffer, getProducts, formatINR } from '../services/storage';

export default function MetaAdsLandingPages({ onPreviewOffer, onNavigate }) {
  const [offers, setOffers] = useState(getOffers());
  const [products] = useState(getProducts());
  const [isEditing, setIsEditing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const offerTypes = [
    { id: 'single', name: '1. Single Product Landing Page', desc: 'Direct high-converting page for 1 specific Reels bundle', reqCount: 1 },
    { id: '2-products', name: '2. 2 Products Offer Page', desc: 'Combo offer page bundling 2 selected Reels products', reqCount: 2 },
    { id: '4-products', name: '3. 4 Products Offer Page', desc: 'Mega bundle offer page combining 4 selected Reels products', reqCount: 4 },
    { id: 'all-products', name: '4. All Products Collection Page', desc: 'Complete Vault collection page including all published products', reqCount: 0 }
  ];

  const emptyOffer = {
    id: '',
    name: 'Meta Ads Campaign Landing Page',
    offerType: '2-products', // 'single', '2-products', '4-products', 'all-products'
    slug: '2-reels-bundle',
    heading: '⚡ 2-IN-1 VIRAL & AI REELS BUNDLE',
    subheading: 'Combine 25,000 Viral Reels + 10,000 AI Avatars for Maximum Social Virality',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    productIds: products.slice(0, 2).map(p => p.id),
    offerPrice: 399,
    originalPrice: 3499,
    ctaText: 'CLAIM THE 2-IN-1 BUNDLE OFFER (₹399)',
    description: 'Special high-converting landing page optimized for Instagram Reels & Meta Ads traffic.',
    benefitsStr: '35,000+ HD Reels Combined\n100% Unbranded & Commercial License\nInstant Google Drive Vault Access\nFree Monthly Lifetime Updates',
    status: 'published'
  };

  const [formData, setFormData] = useState(emptyOffer);

  const handleOpenAdd = (presetType = '2-products') => {
    let initialIds = [];
    let presetSlug = 'special-offer';
    let presetHeading = '🔥 SPECIAL META ADS BUNDLE OFFER';
    let defaultPrice = 399;
    let defaultOriginal = 3499;

    if (presetType === 'single') {
      initialIds = products.slice(0, 1).map(p => p.id);
      presetSlug = products[0] ? products[0].slug : 'single-reels-bundle';
      presetHeading = products[0] ? products[0].name : 'Viral Reels Bundle';
      defaultPrice = products[0] ? products[0].salePrice : 299;
      defaultOriginal = products[0] ? products[0].originalPrice : 1999;
    } else if (presetType === '2-products') {
      initialIds = products.slice(0, 2).map(p => p.id);
      presetSlug = '2-reels-bundle';
      presetHeading = '⚡ 2-IN-1 VIRAL & AI REELS BUNDLE PACK';
      defaultPrice = 399;
      defaultOriginal = 3499;
    } else if (presetType === '4-products') {
      initialIds = products.slice(0, 4).map(p => p.id);
      presetSlug = '4-reels-bundle';
      presetHeading = '🔥 4-IN-1 MEGA VIRAL REELS VAULT OFFER';
      defaultPrice = 499;
      defaultOriginal = 6499;
    } else if (presetType === 'all-products') {
      initialIds = products.map(p => p.id);
      presetSlug = 'all-in-one-vault';
      presetHeading = '👑 ALL-IN-ONE VIRAL DIGITAL REELS COLLECTION';
      defaultPrice = 699;
      defaultOriginal = 9999;
    }

    setFormData({
      ...emptyOffer,
      offerType: presetType,
      slug: presetSlug,
      heading: presetHeading,
      productIds: initialIds,
      offerPrice: defaultPrice,
      originalPrice: defaultOriginal,
      ctaText: `UNLOCK THIS BUNDLE NOW (₹${defaultPrice})`
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (off) => {
    setFormData({
      ...off,
      benefitsStr: (off.benefits || []).join('\n')
    });
    setIsEditing(true);
  };

  const handleDuplicate = (off) => {
    const duplicated = {
      ...off,
      id: '',
      name: `${off.name} (Copy)`,
      slug: `${off.slug}-copy`
    };
    saveOffer(duplicated);
    setOffers(getOffers());
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this Meta Ads Landing Page?')) {
      deleteOffer(id);
      setOffers(getOffers());
    }
  };

  const handleToggleStatus = (off) => {
    const nextStatus = off.status === 'published' ? 'draft' : 'published';
    saveOffer({ ...off, status: nextStatus });
    setOffers(getOffers());
  };

  const handleOfferTypeChange = (newType) => {
    let updatedIds = [];
    if (newType === 'single') updatedIds = products.slice(0, 1).map(p => p.id);
    else if (newType === '2-products') updatedIds = products.slice(0, 2).map(p => p.id);
    else if (newType === '4-products') updatedIds = products.slice(0, 4).map(p => p.id);
    else if (newType === 'all-products') updatedIds = products.map(p => p.id);

    setFormData({
      ...formData,
      offerType: newType,
      productIds: updatedIds
    });
  };

  const handleFormSubmit = (e, statusOverride = null) => {
    e.preventDefault();
    const benefitsArr = formData.benefitsStr.split('\n').filter(b => b.trim().length > 0);
    const calculatedDiscount = Math.round(((formData.originalPrice - formData.offerPrice) / formData.originalPrice) * 100);

    const payload = {
      ...formData,
      benefits: benefitsArr,
      discount: isNaN(calculatedDiscount) ? 85 : calculatedDiscount,
      status: statusOverride || formData.status || 'published'
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

  const getFullLandingUrl = (off) => {
    if (off.offerType === 'single' && off.productIds?.length === 1) {
      const prod = products.find(p => p.id === off.productIds[0]);
      if (prod) return `${window.location.origin}/product/${prod.slug}`;
    }
    return `${window.location.origin}/offer/${off.slug}`;
  };

  const copyLiveLandingUrl = (off) => {
    const fullUrl = getFullLandingUrl(off);
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(off.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenLivePage = (off) => {
    if (off.offerType === 'single' && off.productIds?.length === 1) {
      const prod = products.find(p => p.id === off.productIds[0]);
      if (prod) {
        onNavigate(`/product/${prod.slug}`);
        return;
      }
    }
    onPreviewOffer(off);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & Quick Create Preset Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-black text-2xl text-white">
                Meta Ads <span className="text-cyan-400">Landing Pages Generator</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                HIGH CONVERSION SYSTEM
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Create conversion-optimized Meta Ads landing pages for Single Products, 2-Product Offers, 4-Product Offers, and All Products Vaults.
            </p>
          </div>
        </div>

        {/* 4 Preset Generator Quick Launch Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {offerTypes.map(t => (
            <div
              key={t.id}
              onClick={() => handleOpenAdd(t.id)}
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer space-y-2 group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-cyan-400 tracking-wider">
                  Preset Generator
                </span>
                <Plus className="w-4 h-4 text-cyan-400 group-hover:scale-125 transition-transform" />
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                {t.name}
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Form Modal / Drawer */}
      {isEditing && (
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 space-y-6 shadow-2xl animate-slideDown">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="font-display font-extrabold text-lg text-white">
                {formData.id ? 'Edit Meta Ads Landing Page' : 'Configure New Meta Ads Landing Page'}
              </h3>
            </div>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white p-2">✕</button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Offer Type Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Select Landing Page Type / Strategy
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {offerTypes.map(type => (
                  <div
                    key={type.id}
                    onClick={() => handleOfferTypeChange(type.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.offerType === type.id
                        ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-glow-cyan/20'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <h5 className="text-xs font-bold">{type.name}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Names & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Landing Page Internal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 2-Reels Bundle Meta Ads Campaign"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">URL Slug (Direct Meta Ads Link) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono">/offer/</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="2-reels-bundle"
                    className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-cyan-400 font-mono focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Product Selector Checklist */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <label className="block text-xs font-bold uppercase text-slate-300">
                2. Included Products Selection
              </label>
              
              {formData.offerType === 'all-products' ? (
                <p className="text-xs text-cyan-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  All published Reels bundles will automatically be included in this Vault Collection landing page.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.map(p => {
                    const isSelected = (formData.productIds || []).includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleToggleProductSelection(p.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isSelected ? 'bg-cyan-500/10 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img src={p.thumbnail} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <div className="truncate">
                            <span className="text-xs font-bold block truncate">{p.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{formatINR(p.salePrice)}</span>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Headline, Subheading & Image Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Custom Main Heading *</label>
                <input
                  type="text"
                  required
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  placeholder="e.g. 🔥 MEGA VIRAL REELS VAULT - LIMITED OFFER"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Subheading / Offer Hook</label>
                <input
                  type="text"
                  value={formData.subheading}
                  onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                  placeholder="e.g. Get 55,000+ 4K Reels for 90% OFF today!"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>
            </div>

            {/* Pricing & CTA Button Text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Offer Price (₹) *</label>
                <input
                  type="number"
                  required
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
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">CTA Button Text *</label>
                <input
                  type="text"
                  required
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="UNLOCK ALL REELS NOW (₹399)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>
            </div>

            {/* Benefits List */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Benefits Checklist (1 per line)</label>
              <textarea
                rows={3}
                value={formData.benefitsStr}
                onChange={(e) => setFormData({ ...formData, benefitsStr: e.target.value })}
                placeholder="55,000+ Unbranded Ready-to-Post 4K Reels&#10;100% Commercial & Resell Usage Rights&#10;Instant Google Drive Link Access"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              ></textarea>
            </div>

            {/* Form Submit Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={(e) => handleFormSubmit(e, 'draft')}
                className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-extrabold shadow-glow-cyan"
              >
                Publish Meta Ads Landing Page
              </button>
            </div>

          </form>

        </div>
      )}

      {/* Meta Ads Landing Pages List Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Landing Page Name</th>
                <th className="p-4">Strategy Type</th>
                <th className="p-4">Offer Price</th>
                <th className="p-4">Live URL Slug</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Meta Ads Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {offers.map(off => {
                const liveUrl = getFullLandingUrl(off);
                return (
                  <tr key={off.id} className="hover:bg-slate-900/50 transition-colors">
                    
                    <td className="p-4">
                      <span className="font-bold text-white block">{off.name}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-xs block">{off.heading}</span>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {off.offerType || '2-products'}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-bold text-white">
                      {formatINR(off.offerPrice)} <span className="text-[10px] text-slate-500 line-through">{formatINR(off.originalPrice || 4999)}</span>
                    </td>

                    <td className="p-4 font-mono text-cyan-400 text-[11px] max-w-xs truncate">
                      {liveUrl}
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        off.status === 'published' || off.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {off.status || 'published'}
                      </span>
                    </td>

                    {/* Action Buttons Explicitly Required: Copy Link, Open Page, Edit, Duplicate, Publish/Unpublish, Delete */}
                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => copyLiveLandingUrl(off)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold text-[11px] inline-flex items-center gap-1 transition-all"
                        title="Copy direct landing page URL for Meta Ads"
                      >
                        {copiedId === off.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === off.id ? 'Copied Link!' : 'Copy Link'}
                      </button>

                      <button
                        onClick={() => handleOpenLivePage(off)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Open Live Landing Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(off)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Edit Landing Page"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDuplicate(off)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Duplicate Landing Page"
                      >
                        <Copy className="w-3.5 h-3.5 text-purple-400" />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(off)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title={off.status === 'published' ? 'Unpublish Page' : 'Publish Page'}
                      >
                        {off.status === 'published' ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>

                      <button
                        onClick={() => handleDelete(off.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-red-400 hover:text-red-300"
                        title="Delete Landing Page"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
