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
  { id: 'cat-6', name: 'T-Shirt Bundles', slug: 'tshirt-bundles', active: true, icon: 'Shirt' }
];

// Initial Products Data (Including Premanand Ji Maharaj 1,500+ Reels Bundle)
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
    salePrice: 299,
    discount: 85,
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
    seoDescription: 'Download 1,500+ Pujya Premanand Ji Maharaj Bhakti & Satsang Reels with commercial rights.'
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
      },
      {
        id: 'v-stock-2',
        title: 'Options Trading Hedging Strategy Demo',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-43289-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
        views: '920K',
        likes: '115K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/stock-market-masterclass-2026-vault',
    faq: [
      { question: 'Is this suitable for absolute beginners?', answer: 'Yes! The course starts from basic market terms and progresses step-by-step to advanced Options strategies.' }
    ],
    seoTitle: 'Stock Market & Options Trading Masterclass 2026 | EXE DIGITAL WORLD',
    seoDescription: 'Master stock market price action and options trading with 50+ video lessons.'
  },
  {
    id: 'prod-1',
    name: '25,000+ Viral Reels Bundle HD 4K',
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
    originalPrice: 1999,
    salePrice: 299,
    discount: 85,
    rating: 4.95,
    reviewsCount: 428,
    status: 'published',
    isBestSeller: true,
    demoVideos: [
      {
        id: 'v1',
        title: 'Cyberpunk Futuristic Tech Reel',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        views: '1.2M',
        likes: '142K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/exe-25k-reels-bundle-secure-vault',
    faq: [
      { question: 'How will I receive the files after purchase?', answer: 'Instant automatic delivery! Immediately after payment, you get access to our high-speed Google Drive link.' }
    ],
    seoTitle: '25,000+ Viral Reels Bundle HD 4K | EXE DIGITAL WORLD',
    seoDescription: 'Download 25,000+ viral 4K Reels for Instagram, TikTok and Meta Ads.'
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
    subheading: 'Get 1,500+ HD/4K Unbranded Satsang & Devotional Reels for 85% OFF Today!',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prod-premanand-maharaj'],
    offerPrice: 299,
    originalPrice: 1999,
    discount: 85,
    ctaText: 'BUY PREMANAND MAHARAJ REELS (₹299)',
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
      // If quota exceeded due to huge base64 strings, trim heavy base64 video URLs gracefully
      const sanitized = JSON.parse(JSON.stringify(data)).map(prod => {
        if (prod.demoVideos) {
          prod.demoVideos = prod.demoVideos.map(v => {
            if (v.url && v.url.length > 300000 && v.url.startsWith('data:video')) {
              // Store compact preview marker if payload is super massive
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

// Storage Initialization Helper (ONLY initialize if NOT set yet!)
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.OFFERS)) {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  }
}

// Data API Services

export function getProducts() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
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

  // Generate unique slug if empty or missing
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
