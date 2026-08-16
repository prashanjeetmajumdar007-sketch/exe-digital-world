// EXE DIGITAL WORLD Storage & Persistence Layer (INR Currency & Multi-Category Digital Products)

const STORAGE_KEYS = {
  PRODUCTS: 'exe_products_v1',
  CATEGORIES: 'exe_categories_v1',
  REVIEWS: 'exe_reviews_v1',
  OFFERS: 'exe_offers_v1',
  ORDERS: 'exe_orders_v1',
  SETTINGS: 'exe_settings_v1',
  ADMIN_AUTH: 'exe_admin_auth_v1'
};

// Indian Number Formatter Helper
export function formatINR(amount) {
  const num = Number(amount) || 0;
  return '₹' + num.toLocaleString('en-IN');
}

// Expandable Categories System
export const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Reels Bundles', slug: 'reels-bundles', active: true, icon: 'Video' },
  { id: 'cat-2', name: 'Stock Market & Trading Courses', slug: 'courses', active: true, icon: 'GraduationCap' },
  { id: 'cat-3', name: 'E-Books & Guides', slug: 'ebooks', active: true, icon: 'BookOpen' },
  { id: 'cat-4', name: 'Software & Digital Tools', slug: 'software', active: true, icon: 'Code' },
  { id: 'cat-5', name: 'Design Templates', slug: 'templates', active: true, icon: 'Layout' },
  { id: 'cat-6', name: 'T-Shirt & Graphics Bundles', slug: 'graphics-bundles', active: true, icon: 'Shirt' }
];

// Initial Complete Products Catalog (Premanand Maharaj ₹69, Anime, Gym Fitness, Stock Market, 25K Vault, E-Books)
export const DEFAULT_PRODUCTS = [
  {
    id: 'prod-premanand-maharaj',
    name: '1,500+ Premanand Ji Maharaj Viral Reels Bundle',
    slug: '1500-premanand-ji-maharaj-reels-bundle',
    category: 'reels-bundles',
    thumbnail: '/demo-reels/premanand-maharaj-thumb.jpg',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'High-converting 1,500+ unbranded HD 4K Bhakti & Premanand Ji Maharaj Motivational Reels with subtitles.',
    fullDescription: 'The complete devotional content vault for creators, bhakts, and Instagram page owners. Includes 1,500+ HD/4K vertical video clips of Pujya Premanand Ji Maharaj satsangs, Radha Naam kirtan, spiritual guidance, and motivational quotes. Edit-ready, clean, non-watermarked, and algorithm-optimized.',
    features: [
      '1,500+ Ready-to-Post HD/4K Devotional Reels',
      '100% Unbranded & Watermark-Free',
      'High Virality Spiritual Satsang & Radha Naam Clips',
      'Instant Google Drive Cloud Vault Access',
      'Full Resell & Commercial Rights Included'
    ],
    reelsCount: 1500,
    format: 'MP4 9:16 Vertical HD/4K',
    originalPrice: 1999,
    salePrice: 69,
    discount: 97,
    rating: 4.99,
    reviewsCount: 524,
    status: 'published',
    isBestSeller: true,
    demoVideos: [
      {
        id: 'v-prem-1',
        title: 'Radha Naam Kirtan & Satsang Reel #1',
        url: '/demo-reels/premanand-reel-1.mp4',
        thumbnail: '/demo-reels/premanand-maharaj-thumb.jpg',
        views: '2.4M',
        likes: '310K'
      },
      {
        id: 'v-prem-2',
        title: 'Premanand Ji Maharaj Motivational Updesh #2',
        url: '/demo-reels/premanand-reel-2.mp4',
        thumbnail: '/demo-reels/premanand-maharaj-thumb.jpg',
        views: '1.8M',
        likes: '220K'
      },
      {
        id: 'v-prem-3',
        title: 'Vrindavan Bhakti & Spiritual Discourse #3',
        url: '/demo-reels/premanand-reel-3.mp4',
        thumbnail: '/demo-reels/premanand-maharaj-thumb.jpg',
        views: '1.2M',
        likes: '170K'
      },
      {
        id: 'v-prem-4',
        title: 'Pujya Maharaj Ji Life Guidance Reel #4',
        url: '/demo-reels/premanand-reel-4.mp4',
        thumbnail: '/demo-reels/premanand-maharaj-thumb.jpg',
        views: '3.1M',
        likes: '450K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/1500-premanand-ji-maharaj-reels-vault',
    faq: [
      { question: 'How will I receive the Premanand Maharaj Reels bundle?', answer: 'Instant automatic delivery! Immediately after payment, you get access to our high-speed Google Drive link.' },
      { question: 'Are these videos copyright free?', answer: 'Yes! All 1,500+ Reels are 100% watermark-free and monetization ready for Instagram Reels and YouTube Shorts.' }
    ],
    seoTitle: '1,500+ Premanand Ji Maharaj Viral Reels Bundle | EXE DIGITAL WORLD',
    seoDescription: 'Download 1,500+ Pujya Premanand Ji Maharaj Bhakti & Satsang Reels with commercial rights for just ₹69.'
  },
  {
    id: 'prod-anime-reels',
    name: '500+ 3D Anime & 2D Cartoon Reels Bundle',
    slug: '500-3d-anime-cartoon-reels-bundle',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'Viral 500+ HD/4K 3D Anime & Cartoon Animations with viral audio overlays for massive engagement.',
    fullDescription: 'Unleash ultra-viral anime engagement on Instagram and YouTube Shorts. Features 500+ top-trending 3D Anime edits, DBZ, Demon Slayer, Naruto, and 2D cartoon clips with sync audio, dynamic captions, and crisp 60fps rendering.',
    features: [
      '500+ HD 60fps 3D Anime & 2D Cartoon Video Clips',
      '100% Watermark-Free & Edit Ready',
      'Pre-Synced Trending Beats & Lo-Fi Audio',
      'Instant Cloud Drive Access & Lifetime Updates',
      'Commercial & Resell License Included'
    ],
    reelsCount: 500,
    format: 'MP4 9:16 Vertical HD 60fps',
    originalPrice: 1499,
    salePrice: 199,
    discount: 87,
    rating: 4.96,
    reviewsCount: 289,
    status: 'published',
    isBestSeller: true,
    demoVideos: [
      {
        id: 'v-anime-1',
        title: '3D Anime Cinematic Action Edit',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4',
        views: '1.9M',
        likes: '260K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/anime-cartoon-reels-bundle-vault',
    faq: [
      { question: 'Can I monetize these Anime reels?', answer: 'Yes, all clips are edit-ready and suitable for theme page growth and affiliate monetization.' }
    ]
  },
  {
    id: 'prod-gym-fitness',
    name: '500+ Gym, Fitness & Motivation Reels Bundle',
    slug: '500-gym-fitness-motivation-reels-bundle',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'High-energy 500+ workout, bodybuilding, physique & discipline reels with motivational speech overlays.',
    fullDescription: 'Supercharge your fitness page with 500+ cinematic workout clips, heavy lifting transformations, aesthetic physique edits, and motivational voiceover overlays. Perfect for fitness coaches, gym trainers, and Instagram fitness pages.',
    features: [
      '500+ 4K Ultra HD Fitness & Bodybuilding Reels',
      'Motivational Speech & Hard Beats Audio Overlays',
      'Clean & Watermark Free',
      'Instant Cloud Drive Link Delivery',
      'Full Commercial & Resell Rights'
    ],
    reelsCount: 500,
    format: 'MP4 9:16 Vertical 4K',
    originalPrice: 1499,
    salePrice: 199,
    discount: 87,
    rating: 4.97,
    reviewsCount: 340,
    status: 'published',
    isBestSeller: true,
    demoVideos: [
      {
        id: 'v-gym-1',
        title: 'Physique Transformation & Heavy Deadlift Reel',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-43289-large.mp4',
        views: '2.8M',
        likes: '390K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/gym-fitness-reels-bundle-vault'
  },
  {
    id: 'prod-stock-masterclass',
    name: 'Stock Market & Options Trading Masterclass 2026',
    slug: 'stock-market-trading-masterclass',
    category: 'courses',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'Master Price Action, Options Buying/Selling Strategies, Risk Management & Live Trading Blueprint.',
    fullDescription: 'The complete A-to-Z Stock Market & Options Trading course for beginners and advanced traders. Learn proven Price Action setups, Candlestick patterns, Nifty/BankNifty Options buying and selling strategies, Risk-to-Reward ratio management, and Trading Psychology.',
    features: [
      '50+ High-Quality Video Modules & Live Trade Breakdowns',
      'Nifty & BankNifty Options Trading Blueprint',
      'Price Action & Institutional Chart Pattern Mastery',
      'Downloadable Risk Management Excel Calculators',
      'Instant Google Drive Access + Lifetime Course Updates'
    ],
    reelsCount: 50,
    format: 'HD Video Lessons MP4 (1080p) + PDF Workbooks',
    originalPrice: 4999,
    salePrice: 499,
    discount: 90,
    rating: 4.98,
    reviewsCount: 312,
    status: 'published',
    isBestSeller: true,
    demoVideos: [
      {
        id: 'v-stock-1',
        title: 'Price Action & Support/Resistance Setup',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-chart-bars-on-a-digital-screen-41619-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        views: '1.8M',
        likes: '240K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/stock-market-masterclass-2026-vault'
  },
  {
    id: 'prod-hindi-ebooks',
    name: '1,000+ Hindi E-Books & Self-Help Audiobooks Vault',
    slug: '1000-hindi-ebooks-audiobooks-vault',
    category: 'ebooks',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'Massive library of 1,000+ Bestselling Hindi PDF E-Books, Money Mindset & Personal Growth Books.',
    fullDescription: 'Expand your mind with India’s largest collection of 1,000+ Hindi PDF E-Books and Audiobooks. Covers Business, Financial Freedom, Stock Market, Meditation, Gita Wisdom, Communication Skills, and Psychology.',
    features: [
      '1,000+ Best-Selling Hindi PDF E-Books',
      'Instant Mobile & Laptop Compatible Reading',
      'Covers Finance, Mindset, Bhagavad Gita, Business',
      'Instant High-Speed Google Drive Cloud Access',
      'Lifetime Access & Unlimited Downloads'
    ],
    reelsCount: 1000,
    format: 'PDF E-Books & MP3 Audiobooks',
    originalPrice: 1999,
    salePrice: 199,
    discount: 90,
    rating: 4.94,
    reviewsCount: 215,
    status: 'published',
    isBestSeller: true,
    deliveryLink: 'https://drive.google.com/drive/folders/hindi-ebooks-vault'
  },
  {
    id: 'prod-25k-reels',
    name: '25,000+ Ultimate Viral Reels Vault (Luxury, AI, Tech, Mindset)',
    slug: '25000-viral-reels-bundle',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'Explode your Instagram & Meta Ads reach overnight with 25,000+ unbranded, ultra HD viral Reel videos.',
    fullDescription: 'The ultimate content vault for creators, business owners, agencies, and digital marketers. Get instant download access to over 25,000+ carefully curated, non-watermarked 4K vertical Reels across high-engagement niches like Luxury Lifestyle, AI Tech, Fitness, Motivation, Crypto, and Business Mindset.',
    features: [
      '25,000+ Ready-to-Post HD/4K Reels',
      '100% Non-Watermarked & Edit-Ready',
      'High-Converting Niches (Luxury, AI, Motivation, Fitness, Business)',
      'Bonus: 500+ Trending Audio & Caption Templates',
      'Instant Google Drive & Cloud Access'
    ],
    reelsCount: 25000,
    format: 'MP4 9:16 Vertical (1080x1920 HD / 4K)',
    originalPrice: 2999,
    salePrice: 399,
    discount: 87,
    rating: 4.98,
    reviewsCount: 610,
    status: 'published',
    isBestSeller: true,
    demoVideos: [
      {
        id: 'v1',
        title: 'Cyberpunk Futuristic Tech Reel',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4',
        views: '1.2M',
        likes: '142K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/exe-25k-reels-bundle-secure-vault'
  }
];

// Initial Customer Reviews
export const DEFAULT_REVIEWS = [
  {
    id: 'rev-prem-1',
    productId: 'prod-premanand-maharaj',
    customerName: 'Ramesh Sharma',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    starRating: 5,
    reviewText: 'Pujya Premanand Ji Maharaj reels quality is unbelievable! Posted 2 reels on my devotional page and gained 12,000 new followers in 3 days. Jai Shri Radha!',
    date: '2026-08-14',
    isVerified: true,
    status: 'published'
  },
  {
    id: 'rev-stock-1',
    productId: 'prod-stock-masterclass',
    customerName: 'Anish Agarwal',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    starRating: 5,
    reviewText: 'The Options Trading & Price Action modules are explained so simply. Made back my course fee on my very first BankNifty trade!',
    date: '2026-08-13',
    isVerified: true,
    status: 'published'
  }
];

// Initial Structured Meta Ads Landing Pages System
export const DEFAULT_OFFERS = [
  {
    id: 'off-premanand',
    name: '1,500+ Premanand Maharaj Reels Meta Ads Page',
    offerType: 'single',
    slug: '1500-premanand-ji-maharaj-reels-bundle',
    heading: '1,500+ Premanand Ji Maharaj Viral Reels Bundle',
    subheading: 'Get 1,500+ HD/4K Unbranded Satsang & Devotional Reels for 97% OFF Today!',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prod-premanand-maharaj'],
    offerPrice: 69,
    originalPrice: 1999,
    discount: 97,
    ctaText: 'BUY PREMANAND MAHARAJ REELS (₹69)',
    description: 'High converting landing page for Premanand Ji Maharaj Reels Bundle.',
    benefits: [
      '1,500+ Ready-to-Post HD/4K Devotional Reels',
      '100% Unbranded & Watermark-Free',
      'Instant Google Drive Lifetime Access'
    ],
    status: 'published'
  }
];

// Safe LocalStorage Saver Helper with Quota Protection
export function safeSetItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn(`LocalStorage Quota Exceeded for ${key}, compressing payload...`, err);
    try {
      const sanitized = JSON.parse(JSON.stringify(data)).map(prod => {
        if (prod.demoVideos) {
          prod.demoVideos = prod.demoVideos.map(v => {
            if (v.url && v.url.length > 300000 && v.url.startsWith('data:video')) {
              return { ...v, url: v.url.substring(0, 100000) };
            }
            return v;
          });
        }
        return prod;
      });
      localStorage.setItem(key, JSON.stringify(sanitized));
      return true;
    } catch (e) {
      console.error('Final LocalStorage Error:', e);
      return false;
    }
  }
}

// Storage Initialization Helper
export function initStorage() {
  const currentProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!currentProducts) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  } else {
    // Update Premanand Maharaj product price in existing storage
    try {
      const parsed = JSON.parse(currentProducts);
      const updated = parsed.map(p => p.id === 'prod-premanand-maharaj' ? { ...p, salePrice: 69, discount: 97 } : p);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    } catch (e) {}
  }

  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
  }
  
  const currentOffers = localStorage.getItem(STORAGE_KEYS.OFFERS);
  if (!currentOffers) {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
  } else {
    try {
      const parsedOffers = JSON.parse(currentOffers);
      const updatedOffers = parsedOffers.map(o => o.id === 'off-premanand' ? { ...o, offerPrice: 69, discount: 97, ctaText: 'BUY PREMANAND MAHARAJ REELS (₹69)' } : o);
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updatedOffers));
    } catch (e) {}
  }

  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  }
}

// Data API Services

export function getProducts() {
  initStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const parsed = JSON.parse(data);
    if (!parsed || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return parsed;
  } catch (e) {
    return DEFAULT_PRODUCTS;
  }
}

export function getProductBySlug(slug) {
  const products = getProducts();
  return products.find(p => p.slug === slug || p.id === slug) || null;
}

export function saveProduct(productData) {
  const products = getProducts();
  let updated;

  const generatedSlug = productData.slug
    ? productData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : (productData.name || 'digital-product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (productData.id) {
    updated = products.map(p => p.id === productData.id ? { ...p, ...productData, slug: generatedSlug } : p);
  } else {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug: generatedSlug,
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 0,
      status: productData.status || 'published'
    };
    updated = [newProduct, ...products];
  }

  safeSetItem(STORAGE_KEYS.PRODUCTS, updated);
  return updated;
}

export function deleteProduct(productId) {
  const products = getProducts().filter(p => p.id !== productId);
  safeSetItem(STORAGE_KEYS.PRODUCTS, products);
  return products;
}

export function getCategories() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}

export function saveCategory(categoryData) {
  const categories = getCategories();
  let updated;
  if (categoryData.id) {
    updated = categories.map(c => c.id === categoryData.id ? { ...c, ...categoryData } : c);
  } else {
    const newCat = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    updated = [...categories, newCat];
  }
  safeSetItem(STORAGE_KEYS.CATEGORIES, updated);
  return updated;
}

export function getReviews(productId = null) {
  initStorage();
  let reviews = [];
  try {
    reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
  } catch (e) {
    reviews = DEFAULT_REVIEWS;
  }
  if (productId) {
    return reviews.filter(r => r.productId === productId && r.status === 'published');
  }
  return reviews;
}

export function saveReview(reviewData) {
  const reviews = getReviews();
  let updated;
  if (reviewData.id) {
    updated = reviews.map(r => r.id === reviewData.id ? { ...r, ...reviewData } : r);
  } else {
    const newReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: reviewData.status || 'published'
    };
    updated = [newReview, ...reviews];
  }
  safeSetItem(STORAGE_KEYS.REVIEWS, updated);
  return updated;
}

export function deleteReview(reviewId) {
  const reviews = getReviews().filter(r => r.id !== reviewId);
  safeSetItem(STORAGE_KEYS.REVIEWS, reviews);
  return reviews;
}

export function getOffers() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFERS) || '[]');
  } catch (e) {
    return DEFAULT_OFFERS;
  }
}

export function getOfferBySlug(slug) {
  const offers = getOffers();
  return offers.find(o => o.slug === slug || o.id === slug) || null;
}

export function saveOffer(offerData) {
  const offers = getOffers();
  let updated;
  if (offerData.id) {
    updated = offers.map(o => o.id === offerData.id ? { ...o, ...offerData } : o);
  } else {
    const newOffer = {
      ...offerData,
      id: `off-${Date.now()}`,
      slug: offerData.slug || offerData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      status: offerData.status || 'published'
    };
    updated = [...offers, newOffer];
  }
  safeSetItem(STORAGE_KEYS.OFFERS, updated);
  return updated;
}

export function deleteOffer(offerId) {
  const offers = getOffers().filter(o => o.id !== offerId);
  safeSetItem(STORAGE_KEYS.OFFERS, offers);
  return offers;
}

export function getOrders() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
  } catch (e) {
    return [];
  }
}

export function createOrder(orderPayload) {
  const orders = getOrders();
  const newOrder = {
    id: `EXE-${Math.floor(10000 + Math.random() * 90000)}`,
    ...orderPayload,
    date: new Date().toISOString(),
    paymentStatus: orderPayload.paymentStatus || 'success',
    costBasis: orderPayload.totalAmount * 0.05
  };
  const updated = [newOrder, ...orders];
  safeSetItem(STORAGE_KEYS.ORDERS, updated);
  return newOrder;
}

// Reset Financial Data Helper
export function resetFinancialData() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  return getAdminAnalytics();
}

// Analytics Metrics Calculator for Admin
export function getAdminAnalytics() {
  const orders = getOrders();
  const products = getProducts();

  const totalRevenue = orders.reduce((sum, o) => o.paymentStatus === 'success' ? sum + o.totalAmount : sum, 0);
  const totalCost = orders.reduce((sum, o) => o.paymentStatus === 'success' ? sum + (o.costBasis || 0) : sum, 0);
  const totalProfit = totalRevenue - totalCost;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(o => o.date.startsWith(todayStr) && o.paymentStatus === 'success');
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const thisMonthPrefix = todayStr.substring(0, 7);
  const monthOrders = orders.filter(o => o.date.startsWith(thisMonthPrefix) && o.paymentStatus === 'success');
  const thisMonthRevenue = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const successfulOrders = orders.filter(o => o.paymentStatus === 'success');
  const pendingOrders = orders.filter(o => o.paymentStatus === 'pending');
  const failedOrders = orders.filter(o => o.paymentStatus === 'failed');

  const avgOrderValue = successfulOrders.length > 0 ? Math.round(totalRevenue / successfulOrders.length) : 0;

  const productSalesMap = {};
  successfulOrders.forEach(o => {
    (o.items || []).forEach(item => {
      productSalesMap[item.productName] = (productSalesMap[item.productName] || 0) + (item.price * item.quantity);
    });
  });

  let bestSellerName = 'N/A';
  let bestSellerSales = 0;
  Object.entries(productSalesMap).forEach(([name, rev]) => {
    if (rev > bestSellerSales) {
      bestSellerSales = rev;
      bestSellerName = name;
    }
  });

  return {
    totalRevenue,
    todayRevenue,
    thisMonthRevenue,
    totalProfit,
    totalOrders: orders.length,
    successfulOrdersCount: successfulOrders.length,
    pendingOrdersCount: pendingOrders.length,
    failedOrdersCount: failedOrders.length,
    totalCustomers: new Set(orders.map(o => o.customerEmail)).size,
    totalProducts: products.length,
    avgOrderValue,
    bestSellingProduct: bestSellerName,
    productSalesMap
  };
}

// Admin Auth Status
export function isAdminLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

export function setAdminLoggedIn(status) {
  if (status) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}
