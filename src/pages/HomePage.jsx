import React from 'react';
import { Sparkles, ArrowRight, Flame, ShieldCheck, Download, Smartphone, CheckCircle2 } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import FAQAccordion from '../components/common/FAQAccordion';
import RatingStars from '../components/common/RatingStars';
import PhoneMockup from '../components/common/PhoneMockup';

export default function HomePage({ products = [], onSelectProduct, onQuickBuy, onNavigate }) {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller);

  const homeFaqs = [
    {
      question: 'How do I download my digital Reels bundle after purchase?',
      answer: 'Delivery is 100% automated and instant! As soon as your checkout is confirmed, you will be redirected to the Order Success page containing your high-speed Google Drive link and direct zip file access. An automated email receipt with the link is also sent immediately.'
    },
    {
      question: 'Can I edit these Reels or add my own watermark and text?',
      answer: 'Absolutely! All Reels in our bundles are 100% unbranded, clean, and watermark-free. You can post them as-is or import them into CapCut, Canva, InShot, or Premiere Pro to add your logo, captions, audio, or brand elements.'
    },
    {
      question: 'Are these Reels compatible with Instagram, Meta Ads, TikTok & YouTube Shorts?',
      answer: 'Yes! Every video is rendered in universal 9:16 vertical HD (1080x1920 / 4K) resolution at 60FPS. They comply fully with Meta Ads policies and organic social media algorithms.'
    },
    {
      question: 'Is this a one-time purchase or a recurring monthly subscription?',
      answer: '100% One-time payment! You pay once and enjoy lifetime access to your purchased bundle vault, including all future video updates added to the drive folder.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-transparent blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs font-bold text-cyan-300 shadow-glow-cyan/20">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>🔥 #1 VIRAL DIGITAL REELS MARKETPLACE</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Premium Reels. <br />
                <span className="gradient-text-cyan">Ready to Grow Your Content.</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Get ready-to-use Reels bundles designed for creators, businesses and social media pages. Unbranded 4K vertical footage that explodes organic reach & Meta Ads performance.
              </p>

              {/* CTAs & Trust Metrics */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate('/reels-bundles')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 fill-black" />
                  Explore Reels Bundles
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={() => onNavigate('/offer/viral-reels')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-display font-bold text-sm text-slate-200 glass-card border border-purple-500/40 hover:bg-purple-950/30 hover:border-purple-500 transition-all flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-purple-400" />
                  Meta Ads Special Offers
                </button>
              </div>

              {/* Social Proof Counter */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="user" />
                    <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="user" />
                    <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="user" />
                  </div>
                  <div className="text-left text-xs">
                    <RatingStars rating={4.9} showText={false} />
                    <p className="text-white font-bold">50,000+ Downloads</p>
                  </div>
                </div>

                <div className="text-left text-xs border-l border-slate-800 pl-6 hidden sm:block">
                  <p className="text-white font-extrabold text-sm">Instant Delivery</p>
                  <p className="text-slate-400">Google Drive & Cloud Link</p>
                </div>
              </div>

            </div>

            {/* Right Hero Video Demo Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <PhoneMockup
                videoUrl="https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4"
                title="Featured 4K Viral Reel Demo"
                likes="240K"
                views="2.8M"
                autoPlay={true}
              />
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
              EXPLORE OUR VAULT
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Featured Reels <span className="text-cyan-400">Bundles</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/reels-bundles')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 self-start md:self-auto"
          >
            View All Bundles <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
              onQuickBuy={onQuickBuy}
            />
          ))}
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      {bestSellers.length > 0 && (
        <section className="bg-gradient-to-r from-purple-950/20 via-slate-900/40 to-purple-950/20 py-16 border-y border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gold/20 text-gold border border-gold/40">
                🔥 TOP PERFORMING BUNDLES
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                Best Seller Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Most downloaded video vaults by top agencies and Meta Ads marketers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestSellers.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProduct}
                  onQuickBuy={onQuickBuy}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY EXE DIGITAL WORLD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            THE EXE ADVANTAGE
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Why Creators & Agencies Choose <span className="gradient-text-cyan">EXE DIGITAL WORLD</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered for high organic reach and maximum Meta Ads conversion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Premium Content</h3>
            <p className="text-xs text-slate-400">Ultra 4K vertical resolution, non-watermarked & edit-ready.</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Instant Access</h3>
            <p className="text-xs text-slate-400">Immediate Google Drive link & fast cloud access after pay.</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Ready-to-Use</h3>
            <p className="text-xs text-slate-400">Post directly or customize in CapCut & Canva effortlessly.</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Mobile Friendly</h3>
            <p className="text-xs text-slate-400">9:16 aspect ratio crafted for Instagram & Meta Ads.</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Secure Payment</h3>
            <p className="text-xs text-slate-400">Encrypted instant checkout with SSL protection.</p>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            PROVEN RESULTS
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Loved by <span className="gradient-text-cyan">Creators & Marketers</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real feedback from creators who grew their accounts using EXE bundles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <RatingStars rating={5} showText={false} />
            <p className="text-xs sm:text-sm text-slate-300 italic">
              "The quality of the 25k Reels bundle is unmatched. No logos, ultra high definition, and organized so cleanly. Grew my brand account by 45k followers in 3 weeks!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="user" />
              <div>
                <h4 className="text-xs font-bold text-white">Elena Rostova</h4>
                <span className="text-[10px] text-cyan-400">Verified Buyer • Social Media Manager</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <RatingStars rating={5} showText={false} />
            <p className="text-xs sm:text-sm text-slate-300 italic">
              "Using these Reels for Meta Ads cut our Cost Per Acquisition (CPA) by 60%. The iPhone video demo section on their site gave us exact creative directions."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="user" />
              <div>
                <h4 className="text-xs font-bold text-white">David Chen</h4>
                <span className="text-[10px] text-cyan-400">Verified Buyer • Meta Ads Agency Owner</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <RatingStars rating={5} showText={false} />
            <p className="text-xs sm:text-sm text-slate-300 italic">
              "Instant download was effortless. As soon as payment cleared, I got the Google Drive link. 55,000+ total reels ready to post."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="user" />
              <div>
                <h4 className="text-xs font-bold text-white">Sarah Jenkins</h4>
                <span className="text-[10px] text-cyan-400">Verified Buyer • Content Creator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10 space-y-2">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Have questions before downloading? We've got answers.
          </p>
        </div>

        <FAQAccordion items={homeFaqs} />
      </section>

      {/* FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden bg-gradient-to-r from-slate-950 via-cyan-950/30 to-purple-950/30 shadow-glow-cyan/20">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Upgrade <br />
              <span className="gradient-text-cyan">Your Content?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Get instant lifetime download access to over 55,000+ viral Reels today. Start posting within minutes!
            </p>
            <div>
              <button
                onClick={() => onNavigate('/reels-bundles')}
                className="px-10 py-4 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 fill-black" />
                Explore Bundles Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
