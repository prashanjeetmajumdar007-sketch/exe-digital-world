import React, { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { Video, Shirt, BookOpen, GraduationCap, Layout, Code, Search, Sparkles } from 'lucide-react';
import { getCategories } from '../services/storage';

export default function CategoryProductsPage({ products = [], onSelectProduct, onQuickBuy }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getCategories();

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.shortCaption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
          DIGITAL PRODUCTS VAULT
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-white">
          Reels Bundles & <span className="gradient-text-cyan">Digital Products</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Browse our full library of viral Reels bundles, templates, and digital assets.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bundles (e.g. 25,000 Reels, AI Avatars, Motivation...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-xl"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-black shadow-glow-cyan'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            All Products
          </button>
          
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.slug
                  ? 'bg-cyan-500 text-black shadow-glow-cyan'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 glass-card p-10 rounded-3xl border border-slate-800 max-w-md mx-auto space-y-3">
          <Sparkles className="w-10 h-10 text-cyan-400 mx-auto opacity-50" />
          <h3 className="font-bold text-white text-base">No Products Found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search query or selected category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickBuy={onQuickBuy}
            />
          ))}
        </div>
      )}

    </div>
  );
}
