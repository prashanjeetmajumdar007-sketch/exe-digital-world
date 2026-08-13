import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Clock, ShieldCheck, CheckCircle2, Flame, Copy, Check, Target } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import DemoReelsSection from '../components/product/DemoReelsSection';
import ReviewsList from '../components/product/ReviewsList';
import StickyMobileBuyBar from '../components/product/StickyMobileBuyBar';
import { getProducts, formatINR } from '../services/storage';
import { MetaPixel } from '../services/metaPixel';

export default function OfferLandingPage({ offer, onBuyNow, onNavigate }) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (offer) {
      const allProds = getProducts();
      const matched = allProds.filter(p => (offer.productIds || []).includes(p.id));
      setSelectedProducts(matched.length > 0 ? matched : allProds.slice(0, 2));

      MetaPixel.viewContent({
        id: offer.id,
        name: offer.name,
        category: 'Meta Ads Special Offer',
        salePrice: offer.offerPrice || 499
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [offer]);

  if (!offer) return null;

  const currentUrl = window.location.href;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleOfferBuy = () => {
    const payload = {
      id: offer.id,
      name: offer.name,
      salePrice: offer.offerPrice,
      originalPrice: offer.originalPrice || 4999,
      deliveryLink: 'https://drive.google.com/drive/folders/exe-mega-offer-bundle-access'
    };
    MetaPixel.addToCart(payload);
    onBuyNow(payload);
  };

  const bundleDemoVideos = selectedProducts.flatMap(p => p.demoVideos || []).slice(0, 4);

  return (
    <div className="pb-24 pt-4 space-y-16">
      
      {/* Top Meta Ads Meta Bar & Timer */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-2.5 px-4 text-center text-white text-xs font-bold tracking-wide shadow-md flex items-center justify-center gap-3">
        <span className="flex items-center gap-1">
          <Flame className="w-4 h-4 fill-white" />
          EXCLUSIVE META ADS PROMO - 90% OFF ENDS IN:
        </span>
        <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded font-mono font-extrabold text-sm border border-white/20">
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>

      {/* URL Copy Widget for Meta Ads Marketers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-3 rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-950/80">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold truncate">
            <Target className="w-4 h-4 shrink-0" />
            <span className="text-slate-300">Direct Meta Ads Landing Page URL:</span>
            <code className="text-cyan-300 font-mono underline truncate">{currentUrl}</code>
          </div>
          <button
            onClick={handleCopyUrl}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold flex items-center gap-1.5 transition-all shrink-0"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedUrl ? 'Copied URL!' : 'Copy Direct URL for Ads'}
          </button>
        </div>
      </div>

      {/* HERO OFFER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-center space-y-6 relative overflow-hidden shadow-2xl">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 text-gold border border-gold/40 text-xs font-extrabold tracking-wider uppercase">
            <Flame className="w-4 h-4 fill-gold" />
            SPECIAL BUNDLE OFFER ({offer.discount || 90}% OFF)
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl mx-auto">
            {offer.heading}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal">
            {offer.subheading}
          </p>

          {/* Pricing & Call to Action */}
          <div className="pt-4 max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-center gap-4">
              <span className="font-display font-black text-4xl sm:text-5xl text-white">
                {formatINR(offer.offerPrice)}
              </span>
              <span className="text-xl sm:text-2xl text-slate-500 line-through">
                {formatINR(offer.originalPrice || 4999)}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-cyan-500 text-black shadow-glow-cyan">
                SAVE {formatINR((offer.originalPrice || 4999) - offer.offerPrice)}
              </span>
            </div>

            <button
              onClick={handleOfferBuy}
              className="w-full py-5 rounded-2xl font-display font-black text-sm sm:text-base uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 fill-black" />
              CLAIM BUNDLE OFFER NOW ({formatINR(offer.offerPrice)})
            </button>

            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Instant Google Drive Vault Access • Lifetime Commercial License
            </p>
          </div>

        </div>
      </section>

      {/* PRODUCTS INCLUDED IN BUNDLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            BUNDLE BREAKDOWN
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Products Included in <span className="text-cyan-400">This Offer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={() => onNavigate(`/product/${p.slug}`)}
              onQuickBuy={handleOfferBuy}
            />
          ))}
        </div>
      </section>

      {/* OFFER BENEFITS LIST */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white text-center">
            What You Get With <span className="text-cyan-400">This Exclusive Offer</span>
          </h3>

          <ul className="space-y-4">
            {(offer.benefits || [
              'Instant Google Drive Vault Access to 55,000+ Viral Reels',
              '100% Unbranded 4K & HD Vertical Clips Ready for Editing',
              'Full Commercial & Resell Usage License Included',
              'Compliant with Meta Ads & Instagram Algorithm Standards',
              'Free Lifetime Updates Added Automatically to Cloud'
            ]).map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-semibold">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DEMO REELS VIDEO MOCKUPS */}
      <DemoReelsSection demoVideos={bundleDemoVideos} />

      {/* CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Customer Reviews & Proof
          </h2>
        </div>
        <ReviewsList rating={4.95} totalReviews={340} reviews={[
          {
            id: 'off-rev-1',
            customerName: 'Marcus Vance',
            customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            starRating: 5,
            reviewText: 'Getting all 4 bundles in this single offer was a steal. Saved thousands compared to buying individually.',
            date: '2026-08-11',
            isVerified: true
          },
          {
            id: 'off-rev-2',
            customerName: 'Elena Rostova',
            customerPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
            starRating: 5,
            reviewText: 'Meta Ads performance skyrocketed after testing the reels from this exact offer page.',
            date: '2026-08-12',
            isVerified: true
          }
        ]} />
      </section>

      {/* BOTTOM OFFER CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 rounded-3xl border border-cyan-500/40 text-center space-y-6 bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 shadow-glow-cyan/20">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Claim Your Offer Before Timer Expires!
          </h2>

          <div className="flex items-center justify-center gap-3 font-mono font-extrabold text-2xl text-cyan-400">
            <Clock className="w-6 h-6 animate-pulse" />
            <span>00:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>

          <button
            onClick={handleOfferBuy}
            className="px-10 py-5 rounded-2xl font-display font-black text-sm uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 fill-black" />
            UNLOCK OFFER NOW ({formatINR(offer.offerPrice)})
          </button>
        </div>
      </section>

      {/* Sticky Mobile Buy Bar */}
      <StickyMobileBuyBar
        product={{ name: offer.heading, salePrice: offer.offerPrice, originalPrice: offer.originalPrice || 4999, discount: offer.discount || 90 }}
        onBuyNow={handleOfferBuy}
      />

    </div>
  );
}
