import React from 'react';
import { Eye, ShoppingCart, Check, Flame } from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { MetaPixel } from '../../services/metaPixel';
import { formatINR } from '../../services/storage';

export default function ProductCard({ product, onSelectProduct, onQuickBuy }) {
  const handleViewDetails = () => {
    MetaPixel.viewContent(product);
    onSelectProduct(product);
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    MetaPixel.addToCart(product);
    onQuickBuy(product);
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="glass-card glass-card-hover rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full border border-slate-800/80 group"
    >
      {/* Media Thumbnail Container */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-gold text-black shadow-glow-gold flex items-center gap-1">
              <Flame className="w-3 h-3 fill-black" />
              BEST SELLER
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-cyan-500 text-black shadow-glow-cyan">
            {product.discount}% OFF
          </span>
        </div>

        {/* Reels Count Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-xs font-bold text-cyan-300">
          ⚡ {product.reelsCount.toLocaleString()}+ Reels
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
              {product.category.replace('-', ' ')}
            </span>
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortCaption}
          </p>
        </div>

        {/* Features Preview */}
        <ul className="space-y-1 text-[11px] text-slate-300">
          {(product.features || []).slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-center gap-1.5 truncate">
              <Check className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Pricing & CTA Row */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-xl text-white">
                {formatINR(product.salePrice)}
              </span>
              <span className="text-xs text-slate-500 line-through">
                {formatINR(product.originalPrice)}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">Instant Digital Download</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleViewDetails}
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="View Product Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleBuy}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-black shadow-glow-cyan transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5 fill-black" />
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
