import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, Eye, X, Smartphone } from 'lucide-react';
import { getProducts, saveProduct, deleteProduct, getCategories, formatINR } from '../services/storage';

export default function ProductManager({ onSelectProduct }) {
  const [products, setProducts] = useState(getProducts());
  const [isEditing, setIsEditing] = useState(false);

  const categories = getCategories();

  const emptyForm = {
    id: '',
    name: '',
    slug: '',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    shortCaption: '',
    fullDescription: '',
    featuresStr: '25,000+ Ready-to-Post HD Reels\n100% Non-Watermarked & Edit-Ready\nCommercial & Resell Rights Included',
    reelsCount: 25000,
    format: 'MP4 9:16 Vertical HD',
    originalPrice: 1999,
    salePrice: 299,
    discount: 85,
    demoVideo1: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4',
    demoVideo2: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-43289-large.mp4',
    demoVideo3: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-doing-exercises-with-dumbbells-41617-large.mp4',
    demoVideo4: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-along-the-sea-at-sunset-40131-large.mp4',
    deliveryLink: 'https://drive.google.com/drive/folders/exe-reels-bundle-secure',
    faqStr: 'Q: How do I receive my order?\nA: Instant automatic download via Google Drive.\n\nQ: Are these reels watermark free?\nA: Yes, 100% clean and watermark-free.',
    seoTitle: '',
    seoDescription: '',
    status: 'published',
    isBestSeller: false
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setIsEditing(true);
  };

  const handleOpenEdit = (p) => {
    const demos = p.demoVideos || [];
    setFormData({
      ...p,
      featuresStr: (p.features || []).join('\n'),
      demoVideo1: demos[0]?.url || '',
      demoVideo2: demos[1]?.url || '',
      demoVideo3: demos[2]?.url || '',
      demoVideo4: demos[3]?.url || '',
      faqStr: (p.faq || []).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
    });
    setIsEditing(true);
  };

  const handleDuplicate = (p) => {
    const duplicated = {
      ...p,
      id: '',
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy`
    };
    saveProduct(duplicated);
    setProducts(getProducts());
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const handleFormSubmit = (e, statusOverride = null) => {
    e.preventDefault();

    const featuresArr = formData.featuresStr.split('\n').filter(f => f.trim().length > 0);

    const faqArr = formData.faqStr.split('\n\n').map(pair => {
      const lines = pair.split('\n');
      const q = lines[0] ? lines[0].replace(/^Q:\s*/i, '').trim() : '';
      const a = lines[1] ? lines[1].replace(/^A:\s*/i, '').trim() : '';
      return { question: q, answer: a };
    }).filter(f => f.question);

    const demoVideos = [
      { id: 'v1', title: 'Demo Video #1', url: formData.demoVideo1, views: '1.2M', likes: '140K' },
      { id: 'v2', title: 'Demo Video #2', url: formData.demoVideo2, views: '890K', likes: '90K' },
      { id: 'v3', title: 'Demo Video #3', url: formData.demoVideo3, views: '2.1M', likes: '210K' },
      { id: 'v4', title: 'Demo Video #4', url: formData.demoVideo4, views: '1.5M', likes: '160K' }
    ].filter(v => v.url && v.url.trim().length > 0);

    const calculatedDiscount = Math.round(((formData.originalPrice - formData.salePrice) / formData.originalPrice) * 100);

    const payload = {
      ...formData,
      features: featuresArr,
      faq: faqArr,
      demoVideos,
      discount: isNaN(calculatedDiscount) ? 80 : calculatedDiscount,
      status: statusOverride || formData.status || 'published'
    };

    saveProduct(payload);
    setProducts(getProducts());
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-white">
            Product Management <span className="text-cyan-400">({products.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Create, edit, duplicate, and manage demo video reels for all products in INR (₹).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Edit / Add Product Form Drawer */}
      {isEditing && (
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 space-y-6 shadow-2xl relative animate-slideDown">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-display font-extrabold text-lg text-white">
              {formData.id ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 25,000+ Viral Reels Bundle HD 4K"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">URL Slug (Auto)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="25000-viral-reels-bundle"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-cyan-400 font-mono focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:border-cyan-500"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Number of Reels</label>
                <input
                  type="number"
                  value={formData.reelsCount}
                  onChange={(e) => setFormData({ ...formData, reelsCount: parseInt(e.target.value) || 0 })}
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
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Sale Price (₹)</label>
                <input
                  type="number"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-800 text-cyan-400 focus:ring-0"
                  />
                  Is Best Seller
                </label>
              </div>
            </div>

            {/* Captions & Description */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Short Caption / Subtitle *</label>
                <input
                  type="text"
                  required
                  value={formData.shortCaption}
                  onChange={(e) => setFormData({ ...formData, shortCaption: e.target.value })}
                  placeholder="Short high-converting hook..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                ></textarea>
              </div>
            </div>

            {/* DEMO REEL VIDEOS MANAGEMENT */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                Demo Reel Video URLs (Renders in iPhone 13 Mockup)
              </h4>
              <p className="text-xs text-slate-400">
                Upload or paste up to 4 direct MP4 video URLs for the interactive vertical 9:16 phone players.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Demo Reel Video #1 (MP4 URL)</label>
                  <input
                    type="url"
                    value={formData.demoVideo1}
                    onChange={(e) => setFormData({ ...formData, demoVideo1: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Demo Reel Video #2 (MP4 URL)</label>
                  <input
                    type="url"
                    value={formData.demoVideo2}
                    onChange={(e) => setFormData({ ...formData, demoVideo2: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Demo Reel Video #3 (MP4 URL)</label>
                  <input
                    type="url"
                    value={formData.demoVideo3}
                    onChange={(e) => setFormData({ ...formData, demoVideo3: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Demo Reel Video #4 (MP4 URL)</label>
                  <input
                    type="url"
                    value={formData.demoVideo4}
                    onChange={(e) => setFormData({ ...formData, demoVideo4: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Link & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Digital Delivery Access Link *</label>
                <input
                  type="text"
                  required
                  value={formData.deliveryLink}
                  onChange={(e) => setFormData({ ...formData, deliveryLink: e.target.value })}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Features List (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.featuresStr}
                  onChange={(e) => setFormData({ ...formData, featuresStr: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                ></textarea>
              </div>
            </div>

            {/* Submit Action Buttons */}
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
                Publish Product
              </button>
            </div>

          </form>

        </div>
      )}

      {/* Product List Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (INR)</th>
                <th className="p-4">Reels</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-white block">{p.name}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">/product/{p.slug}</span>
                    </div>
                  </td>
                  <td className="p-4 uppercase font-semibold text-[10px] text-purple-400">
                    {p.category}
                  </td>
                  <td className="p-4 font-mono font-bold text-white">
                    {formatINR(p.salePrice)} <span className="text-[10px] text-slate-500 line-through">{formatINR(p.originalPrice)}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-300">
                    {p.reelsCount?.toLocaleString()}+
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      p.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      title="View Product Page"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(p)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      title="Duplicate Product"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 rounded-lg bg-slate-800 text-red-400 hover:text-red-300"
                      title="Delete Product"
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

    </div>
  );
}
