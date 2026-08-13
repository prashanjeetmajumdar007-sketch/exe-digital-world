import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { MetaPixel } from '../../services/metaPixel';
import { formatINR } from '../../services/storage';

export default function StickyMobileBuyBar({ product, onBuyNow }) {
  if (!product) return null;

  const handleBuyClick = () => {
    MetaPixel.addToCart(product);
    onBuyNow(product);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden glass-panel border-t border-cyan-500/40 bg-slate-950/95 p-3.5 backdrop-blur-xl shadow-2xl animate-slideUp">
      <div className="flex items-center justify-between gap-3">
        
        {/* Price & Title Info */}
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block truncate">
            {product.name}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-lg text-white">
              {formatINR(product.salePrice)}
            </span>
            <span className="text-xs text-slate-500 line-through">
              {formatINR(product.originalPrice)}
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-extrabold">
              {product.discount}% OFF
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleBuyClick}
          className="px-6 py-3 rounded-xl font-display text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-4 h-4 fill-black" />
          BUY NOW
        </button>

      </div>
    </div>
  );
}
