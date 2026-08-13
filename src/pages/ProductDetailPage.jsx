import React, { useEffect, useState } from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Download, CheckCircle2, ArrowLeft, Flame, Lock } from 'lucide-react';
import DemoReelsSection from '../components/product/DemoReelsSection';
import WhatYouGet from '../components/product/WhatYouGet';
import ReviewsList from '../components/product/ReviewsList';
import StickyMobileBuyBar from '../components/product/StickyMobileBuyBar';
import FAQAccordion from '../components/common/FAQAccordion';
import RatingStars from '../components/common/RatingStars';
import { getReviews, formatINR } from '../services/storage';
import { MetaPixel } from '../services/metaPixel';

export default function ProductDetailPage({ product, onBuyNow, onBack }) {
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    if (product) {
      MetaPixel.viewContent(product);
      setProductReviews(getReviews(product.id));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) return null;

  const handleBuyClick = () => {
    MetaPixel.addToCart(product);
    onBuyNow(product);
  };

  return (
    <div className="pb-24 pt-6 space-y-16">
      
      {/* Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          Back to Products Vault
        </button>
      </div>

      {/* 1. PRODUCT HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Product Media Banner & Badge */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 relative aspect-[16/10] group">
              <img
                src={product.banner || product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Discount & Rating Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-cyan-500 text-black shadow-glow-cyan">
                  {product.discount}% OFF TODAY
                </span>
                {product.isBestSeller && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-gold text-black shadow-glow-gold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-black" />
                    BEST SELLER
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold text-slate-200">
                <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-cyan-400">
                  ⚡ {product.reelsCount?.toLocaleString()}+ Unbranded Clips
                </span>
                <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  {product.format || '4K 9:16 Vertical'}
                </span>
              </div>
            </div>

            {/* Quick Guarantees Bar */}
            <div className="grid grid-cols-3 gap-3 text-center text-[11px] text-slate-300">
              <div className="p-3 rounded-2xl glass-card border border-slate-800">
                <Download className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="font-bold block">Instant Download</span>
                <span className="text-[9px] text-slate-400">Google Drive Vault</span>
              </div>
              <div className="p-3 rounded-2xl glass-card border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="font-bold block">Commercial License</span>
                <span className="text-[9px] text-slate-400">Unrestricted Rights</span>
              </div>
              <div className="p-3 rounded-2xl glass-card border border-slate-800">
                <Lock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <span className="font-bold block">Lifetime Access</span>
                <span className="text-[9px] text-slate-400">0 Monthly Fees</span>
              </div>
            </div>
          </div>

          {/* Product Sales Copy & Purchase Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {product.category?.replace('-', ' ')}
                </span>
                <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {product.shortCaption}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 space-y-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-black text-4xl text-white">
                  {formatINR(product.salePrice)}
                </span>
                <span className="text-lg text-slate-500 line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  SAVE {formatINR(product.originalPrice - product.salePrice)} ({product.discount}% OFF)
                </span>
              </div>

              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                In Stock • Instant Automated Digital Delivery Access
              </p>

              {/* BUY NOW CTA */}
              <button
                onClick={handleBuyClick}
                className="w-full py-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 fill-black" />
                BUY NOW - INSTANT ACCESS ({formatINR(product.salePrice)})
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>🔒 256-Bit SSL Encrypted</span>
                <span>⚡ Instant Download Link</span>
                <span>🛡️ Lifetime License</span>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Key Features Included:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {(product.features || []).map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 2. DEMO REELS SECTION (iPhone 13 9:16 Mockups) */}
      <DemoReelsSection demoVideos={product.demoVideos} />

      {/* 3. WHAT YOU GET & SPECIFICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhatYouGet product={product} />
      </section>

      {/* 4. FULL DESCRIPTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-display font-bold text-xl text-white">
            About This <span className="text-cyan-400">Digital Vault</span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {product.fullDescription}
          </p>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            REAL CREATOR FEEDBACK
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Product Customer Reviews
          </h2>
        </div>

        <ReviewsList
          reviews={productReviews}
          rating={product.rating}
          totalReviews={product.reviewsCount}
        />
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <FAQAccordion items={product.faq} />
      </section>

      {/* 7. FINAL BUY NOW BOX */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center space-y-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-glow-cyan/20">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Get <span className="gradient-text-cyan">{product.name}</span> Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Instant 1-Click Google Drive download link. Lifetime commercial license included.
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="font-display font-black text-3xl text-white">{formatINR(product.salePrice)}</span>
            <span className="text-slate-500 line-through text-lg">{formatINR(product.originalPrice)}</span>
          </div>

          <button
            onClick={handleBuyClick}
            className="px-10 py-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 fill-black" />
            BUY NOW & ACCESS IMMEDIATELY
          </button>
        </div>
      </section>

      {/* Mobile Sticky Buy Bar */}
      <StickyMobileBuyBar product={product} onBuyNow={handleBuyClick} />

    </div>
  );
}
