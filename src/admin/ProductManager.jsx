import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, Eye, X, Smartphone, Upload, Image as ImageIcon, Video, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { getProducts, saveProduct, deleteProduct, getCategories, formatINR } from '../services/storage';

export default function ProductManager({ onSelectProduct }) {
  const [products, setProducts] = useState(getProducts());
  const [isEditing, setIsEditing] = useState(false);

  const categories = getCategories();

  const emptyForm = {
    id: '',
    name: '',
    slug: '',
    category: 'courses', // Default or selected category
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1400&q=80',
    shortCaption: '',
    fullDescription: '',
    featuresStr: 'Comprehensive Video Lessons & Workbooks\nInstant Cloud Access & Lifetime Updates\nFull Commercial Rights Included',
    reelsCount: 50,
    format: 'HD Video Lessons & PDF Guides',
    originalPrice: 4999,
    salePrice: 499,
    discount: 90,
    demoVideos: [
      { id: 'v1', title: 'Demo Video #1', url: 'https://assets.mixkit.co/videos/preview/mixkit-chart-bars-on-a-digital-screen-41619-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80' },
      { id: 'v2', title: 'Demo Video #2', url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-43289-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80' }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/exe-digital-product-access',
    faqStr: 'Q: How do I access my product after purchase?\nA: Instant automatic access via Google Drive link immediately after checkout.\n\nQ: Does it include lifetime updates?\nA: Yes, all buyers receive free lifetime updates.',
    status: 'published',
    isBestSeller: true
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
      demoVideos: demos.length > 0 ? demos : emptyForm.demoVideos,
      faqStr: (p.faq || []).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
    });
    setIsEditing(true);
  };

  const handleMainImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDemoVideoChange = (index, field, value) => {
    const updatedDemos = [...(formData.demoVideos || [])];
    if (!updatedDemos[index]) {
      updatedDemos[index] = { id: `v-${index + 1}`, title: `Demo Reel #${index + 1}`, url: '', thumbnail: '' };
    }
    updatedDemos[index][field] = value;
    setFormData({ ...formData, demoVideos: updatedDemos });
  };

  const handleDemoVideoFileUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleDemoVideoChange(index, 'url', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDemoThumbnailUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleDemoVideoChange(index, 'thumbnail', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDemoVideoField = () => {
    const current = formData.demoVideos || [];
    const nextIdx = current.length + 1;
    setFormData({
      ...formData,
      demoVideos: [
        ...current,
        { id: `v-${nextIdx}`, title: `Demo Video #${nextIdx}`, url: '', thumbnail: '' }
      ]
    });
  };

  const handleRemoveDemoVideoField = (index) => {
    const updated = (formData.demoVideos || []).filter((_, i) => i !== index);
    setFormData({ ...formData, demoVideos: updated });
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

    const validDemoVideos = (formData.demoVideos || []).filter(v => v.url && v.url.trim().length > 0);

    const calculatedDiscount = Math.round(((formData.originalPrice - formData.salePrice) / formData.originalPrice) * 100);

    const payload = {
      ...formData,
      features: featuresArr,
      faq: faqArr,
      demoVideos: validDemoVideos,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white">
            Product Management <span className="text-cyan-400">({products.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Manage Courses, Reels Bundles, E-Books, Software, Custom Images, and Direct Video File Uploads in INR (₹).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan flex items-center gap-2 hover:scale-105 transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          Add New Product / Course
        </button>
      </div>

      {/* Edit / Add Product Form Drawer */}
      {isEditing && (
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 space-y-6 shadow-2xl relative animate-slideDown">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              {formData.id ? 'Edit Digital Product / Course' : 'Create New Product / Course'}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* 1. Main Product Image Upload & Preview */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase text-slate-200 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  1. Main Product Image (1:1 Ratio Recommended) *
                </label>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  RECOMMENDED RATIO 1:1
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                
                {/* Image Preview Box */}
                <div className="w-32 h-32 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative group">
                  <img
                    src={formData.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80'}
                    alt="Main Product Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-cyan-400 font-bold">
                    1:1 Preview
                  </div>
                </div>

                {/* Upload or URL Inputs */}
                <div className="sm:col-span-2 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Option A: Upload Image File (Local Computer)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageFileUpload}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Option B: Image URL (CDN / Web Link)</label>
                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Basic Info & Category Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Product / Course Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Stock Market & Options Trading Masterclass"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="stock-market-trading-masterclass"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-cyan-400 font-mono focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category *</label>
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

            {/* Pricing & Best Seller Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Items / Lessons Count</label>
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
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Sale Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white font-bold text-cyan-400"
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
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Short Subtitle / Caption *</label>
                <input
                  type="text"
                  required
                  value={formData.shortCaption}
                  onChange={(e) => setFormData({ ...formData, shortCaption: e.target.value })}
                  placeholder="e.g. Master Price Action, Options Buying & Risk Management..."
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

            {/* 2. DEMO VIDEOS & CUSTOM VIDEO THUMBNAILS MANAGEMENT (DIRECT VIDEO UPLOAD) */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-400" />
                    2. Demo Videos & Custom Video Thumbnails (Direct MP4 File Upload or URL)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Upload MP4 video files directly from your computer or paste video URLs. Videos play inline on the website!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddDemoVideoField}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Demo Video
                </button>
              </div>

              <div className="space-y-4">
                {(formData.demoVideos || []).map((demo, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Demo Video #{idx + 1}
                      </span>
                      {formData.demoVideos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDemoVideoField(idx)}
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Video Title */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">Video Title</label>
                        <input
                          type="text"
                          value={demo.title || ''}
                          onChange={(e) => handleDemoVideoChange(idx, 'title', e.target.value)}
                          placeholder="e.g. Price Action Strategy Demo"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>

                      {/* Direct Video File Upload OR MP4 URL */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">Direct Video MP4 (File Upload or URL)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={demo.url || ''}
                            onChange={(e) => handleDemoVideoChange(idx, 'url', e.target.value)}
                            placeholder="MP4 URL or Upload Video File below..."
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono"
                          />
                          <label className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 cursor-pointer shrink-0 flex items-center gap-1 font-bold text-[10px]" title="Upload MP4 Video File from computer">
                            <Upload className="w-3.5 h-3.5 text-cyan-400" />
                            Upload MP4
                            <input type="file" accept="video/*" className="hidden" onChange={(e) => handleDemoVideoFileUpload(idx, e)} />
                          </label>
                        </div>
                      </div>

                      {/* Custom Video Thumbnail Image */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">Custom Video Thumbnail (Image URL or Upload)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={demo.thumbnail || ''}
                            onChange={(e) => handleDemoVideoChange(idx, 'thumbnail', e.target.value)}
                            placeholder="Thumbnail URL..."
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono"
                          />
                          <label className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer shrink-0" title="Upload Thumbnail File">
                            <Upload className="w-4 h-4 text-cyan-400" />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleDemoThumbnailUpload(idx, e)} />
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Access Link & Features */}
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
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Features Checklist (1 per line)</label>
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
                Save & Publish Product
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
                <th className="p-4">Product / Course</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (INR)</th>
                <th className="p-4">Items</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.thumbnail} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-800" />
                    <div>
                      <span className="font-bold text-white block text-xs">{p.name}</span>
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
