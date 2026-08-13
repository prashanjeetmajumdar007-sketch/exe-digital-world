// EXE DIGITAL WORLD Storage & Persistence Layer (INR Currency & Meta Ads Landing Pages System)

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

// Initial Scalable Categories
export const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Reels Bundles', slug: 'reels-bundles', active: true, icon: 'Video' },
  { id: 'cat-2', name: 'T-Shirt Bundles', slug: 'tshirt-bundles', active: true, icon: 'Shirt' },
  { id: 'cat-3', name: 'E-Books & Guides', slug: 'ebooks', active: true, icon: 'BookOpen' },
  { id: 'cat-4', name: 'Video Courses', slug: 'courses', active: true, icon: 'GraduationCap' },
  { id: 'cat-5', name: 'Design Templates', slug: 'templates', active: true, icon: 'Layout' },
  { id: 'cat-6', name: 'Software & Tools', slug: 'software', active: true, icon: 'Code' }
];

// Initial Products Data (Priced in INR ₹)
export const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: '25,000+ Viral Reels Bundle HD 4K',
    slug: '25000-viral-reels-bundle',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'Explode your Instagram & Meta Ads reach overnight with 25,000+ unbranded, ultra HD viral Reel videos.',
    fullDescription: 'The ultimate content vault for creators, business owners, agencies, and digital marketers. Get instant download access to over 25,000+ carefully curated, non-watermarked 4K vertical Reels across high-engagement niches like Luxury Lifestyle, AI Tech, Fitness, Motivation, Crypto, and Business Mindset. Edit effortlessly in Canva, CapCut, or Premiere Pro.',
    features: [
      '25,000+ Ready-to-Post HD/4K Reels',
      '100% Non-Watermarked & Edit-Ready',
      'High-Converting Niches (Luxury, AI, Motivation, Fitness, Business)',
      'Bonus: 500+ Trending Audio & Caption Templates',
      'Instant Google Drive & Cloud Access',
      'Full Commercial & Resell Usage Rights'
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
        views: '1.2M',
        likes: '142K'
      },
      {
        id: 'v2',
        title: 'Digital Creator Smartphone Mockup',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-43289-large.mp4',
        views: '890K',
        likes: '94K'
      },
      {
        id: 'v3',
        title: 'High-Energy Fitness & Gym Reel',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-doing-exercises-with-dumbbells-41617-large.mp4',
        views: '2.4M',
        likes: '280K'
      },
      {
        id: 'v4',
        title: 'Sunset Aesthetic Motivation Reel',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-along-the-sea-at-sunset-40131-large.mp4',
        views: '1.8M',
        likes: '195K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/exe-25k-reels-bundle-secure-vault',
    faq: [
      { question: 'How will I receive the files after purchase?', answer: 'Instant automatic delivery! Immediately after payment, you will get access to our high-speed Google Drive link and direct zip downloads.' },
      { question: 'Can I use these Reels for client projects and Meta Ads?', answer: 'Yes! All videos come with an unrestricted commercial license. You can use them for organic growth, Meta Ads, TikTok ads, or client accounts.' },
      { question: 'Are there any watermarks or logos on the videos?', answer: 'No! Every single Reel is 100% clean and watermark-free, ready for you to add your own brand text, logos, or captions.' }
    ],
    seoTitle: '25,000+ Viral Reels Bundle HD 4K | EXE DIGITAL WORLD',
    seoDescription: 'Download 25,000+ viral 4K Reels for Instagram, TikTok and Meta Ads. Instant download with lifetime license.'
  },
  {
    id: 'prod-2',
    name: '10,000+ AI Avatar & Luxury Lifestyle Reels',
    slug: '10000-ai-avatar-luxury-reels',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1614680376593-902f749f7edc?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'Faceless channel secret sauce! 10,000+ photorealistic AI Avatars & Luxury Cars, Superyachts & Mansions Reels.',
    fullDescription: 'Build a million-follower faceless Instagram account in record time. Includes 10,000+ ultra-hd AI-generated spokesperson clips, voiceover hooks, luxury sports cars, private jets, and aesthetic aesthetic footage that print engagement on autopilot.',
    features: [
      '10,000+ AI Avatars & Luxury Footage Clips',
      'Perfect for Faceless Instagram & YouTube Shorts',
      'Ultra Crisp 60FPS Video Rendering',
      'Includes Virality Playbook & Growth Blueprint',
      'Instant Cloud Access & Lifetime Updates'
    ],
    reelsCount: 10000,
    format: 'MP4 9:16 Vertical 60FPS',
    originalPrice: 1499,
    salePrice: 199,
    discount: 87,
    rating: 4.92,
    reviewsCount: 284,
    status: 'published',
    isBestSeller: true,
    demoVideos: [
      {
        id: 'v5',
        title: 'Fashion & Luxury Model Aesthetic',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-woman-posing-for-the-camera-42867-large.mp4',
        views: '940K',
        likes: '110K'
      },
      {
        id: 'v6',
        title: 'Futuristic Ocean Waves & Serenity',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
        views: '1.5M',
        likes: '160K'
      },
      {
        id: 'v7',
        title: 'Cyberpunk Neon City Grid',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4',
        views: '3.1M',
        likes: '340K'
      },
      {
        id: 'v8',
        title: 'Smartphone Mobile Tech Creator',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-43289-large.mp4',
        views: '670K',
        likes: '82K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/exe-10k-ai-luxury-reels-secure',
    faq: [
      { question: 'What editing software do I need?', answer: 'None required! You can upload directly or edit text with free apps like CapCut, Canva, or InShot.' },
      { question: 'Do I get future updates?', answer: 'Yes, all buyers get lifetime free updates added to the drive folder every month.' }
    ],
    seoTitle: '10,000+ AI Avatar & Luxury Reels Bundle | EXE DIGITAL WORLD',
    seoDescription: 'Supercharge your faceless page with 10,000+ AI Avatars and Luxury lifestyle video clips.'
  },
  {
    id: 'prod-3',
    name: '15,000+ Entrepreneur & Business Motivation Reels',
    slug: '15000-business-motivation-reels',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'High-converting motivational reels featuring billionaire speeches, podcast highlights, and viral quote overlays.',
    fullDescription: 'Attract high-ticket followers, entrepreneurs, and ambitious audiences. 15,000+ high-impact business mindset clips with viral dynamic subtitles pre-added for maximum watch time.',
    features: [
      '15,000+ Business & Motivation Reels',
      'Dynamic Auto-Captions Included',
      'Podcast Hooks & Billionaire Insights',
      '100% Monetization Approved',
      'Instant One-Click Google Drive Access'
    ],
    reelsCount: 15000,
    format: 'MP4 9:16 Vertical HD',
    originalPrice: 1699,
    salePrice: 249,
    discount: 86,
    rating: 4.89,
    reviewsCount: 196,
    status: 'published',
    isBestSeller: false,
    demoVideos: [
      {
        id: 'v9',
        title: 'Sunset Fitness Runner Motivation',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-along-the-sea-at-sunset-40131-large.mp4',
        views: '1.9M',
        likes: '210K'
      },
      {
        id: 'v10',
        title: 'Workout & Fitness Grind',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-doing-exercises-with-dumbbells-41617-large.mp4',
        views: '1.1M',
        likes: '135K'
      },
      {
        id: 'v11',
        title: 'Futuristic Night City Skyline',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4',
        views: '820K',
        likes: '95K'
      },
      {
        id: 'v12',
        title: 'Aesthetic Coastal Waves',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
        views: '540K',
        likes: '68K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/exe-15k-motivation-vault',
    faq: [
      { question: 'Are these compatible with Meta Ads?', answer: 'Yes! These videos have zero copyright flags and perform exceptionally well in Facebook & Instagram ad campaigns.' }
    ],
    seoTitle: '15,000+ Business & Motivation Reels Bundle | EXE DIGITAL WORLD',
    seoDescription: 'High converting motivation reels bundle for Instagram creators and business pages.'
  },
  {
    id: 'prod-4',
    name: '5,000+ Aesthetic Travel & Relaxing Nature Reels',
    slug: '5000-aesthetic-travel-reels',
    category: 'reels-bundles',
    thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1476514525535-ce74f45814ce?auto=format&fit=crop&w=1400&q=80',
    shortCaption: 'Breathtaking 4K drone shots, exotic beaches, cozy mountain cabins, and viral aesthetic travel clips.',
    fullDescription: 'Captivate your audience with mesmerizing 4K travel footage from Bali, Switzerland, Dubai, Maldives, and Japan. Ideal for travel bloggers, lifestyle creators, and relaxation pages.',
    features: [
      '5,000+ 4K Cinematic Travel Clips',
      'Drone Shot Angles & Slow-Motion Scenes',
      'Royalty-Free Audio Sync Files Included',
      'High Organic Virality Rate',
      'Instant Download & Lifetime Access'
    ],
    reelsCount: 5000,
    format: 'MP4 9:16 4K Ultra HD',
    originalPrice: 1299,
    salePrice: 149,
    discount: 88,
    rating: 4.97,
    reviewsCount: 152,
    status: 'published',
    isBestSeller: false,
    demoVideos: [
      {
        id: 'v13',
        title: 'Aesthetic Coastal Waters',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
        views: '2.8M',
        likes: '310K'
      },
      {
        id: 'v14',
        title: 'Sunset Beach Runner',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-along-the-sea-at-sunset-40131-large.mp4',
        views: '1.4M',
        likes: '175K'
      },
      {
        id: 'v15',
        title: 'Fashion Portrait in Motion',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-woman-posing-for-the-camera-42867-large.mp4',
        views: '920K',
        likes: '105K'
      },
      {
        id: 'v16',
        title: 'Futuristic Cityscape',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4',
        views: '1.1M',
        likes: '140K'
      }
    ],
    deliveryLink: 'https://drive.google.com/drive/folders/exe-5k-travel-reels-access',
    faq: [
      { question: 'What resolution are the videos?', answer: 'All videos in this bundle are 1080x1920 HD and 4K Ultra High Definition.' }
    ],
    seoTitle: '5,000+ Cinematic Travel Reels Bundle | EXE DIGITAL WORLD',
    seoDescription: 'Breathtaking travel and aesthetic drone reels bundle for social media growth.'
  }
];

// Initial Customer Reviews
export const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerName: 'Marcus Vance',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    starRating: 5,
    reviewText: 'Blew my mind! I posted 3 reels from the 25k bundle on a brand new page and got 480k views in 48 hours. Best ₹299 I ever spent.',
    date: '2026-08-10',
    isVerified: true,
    status: 'published'
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    customerName: 'Elena Rostova',
    customerPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    starRating: 5,
    reviewText: 'Running Meta Ads for my e-commerce brand became 10x easier. The phone mockup video preview on their landing page gave me exact ideas for ad creatives.',
    date: '2026-08-11',
    isVerified: true,
    status: 'published'
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    customerName: 'David Chen',
    customerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    starRating: 5,
    reviewText: 'The AI avatar clips are insanely realistic. No watermark, high frame rate, instant drive delivery. 100% recommended!',
    date: '2026-08-12',
    isVerified: true,
    status: 'published'
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    customerName: 'Sarah Jenkins',
    customerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    starRating: 5,
    reviewText: 'Super fast download speeds. The drive link was immediately available on the order success screen and sent to my email.',
    date: '2026-08-09',
    isVerified: true,
    status: 'published'
  }
];

// Initial Structured Meta Ads Landing Pages System
export const DEFAULT_OFFERS = [
  {
    id: 'off-1',
    name: '1. Single Product Landing Page (25k Viral Reels)',
    offerType: 'single',
    slug: '25000-viral-reels-bundle',
    heading: '25,000+ Viral Reels Bundle HD 4K',
    subheading: 'Explode your Instagram & Meta Ads reach overnight with 25,000+ unbranded 4K vertical Reels.',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prod-1'],
    offerPrice: 299,
    originalPrice: 1999,
    discount: 85,
    ctaText: 'BUY NOW - INSTANT ACCESS (₹299)',
    description: 'Direct high-converting single product landing page.',
    benefits: [
      '25,000+ Ready-to-Post HD/4K Reels',
      '100% Non-Watermarked & Edit-Ready',
      'Instant Google Drive Vault Access'
    ],
    status: 'published'
  },
  {
    id: 'off-2',
    name: '2. 2-Products Offer Page (Viral + AI Avatars)',
    offerType: '2-products',
    slug: '2-reels-bundle',
    heading: '⚡ 2-IN-1 VIRAL & AI REELS BUNDLE PACK',
    subheading: 'Combine 25,000 Viral Reels + 10,000 AI Avatars for Maximum Social Virality',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prod-1', 'prod-2'],
    offerPrice: 399,
    originalPrice: 3499,
    discount: 88,
    ctaText: 'CLAIM THE 2-IN-1 BUNDLE OFFER (₹399)',
    description: 'Double your content output with our two top-performing Reels libraries at a special discounted bundle rate.',
    benefits: [
      '35,000+ HD Reels Combined',
      'Viral Lifestyle & Photorealistic AI Clips',
      'Lifetime Drive Access with 0 Monthly Fees'
    ],
    status: 'published'
  },
  {
    id: 'off-3',
    name: '3. 4-Products Mega Offer Page',
    offerType: '4-products',
    slug: '4-reels-bundle',
    heading: '🔥 4-IN-1 MEGA VIRAL REELS VAULT OFFER',
    subheading: 'Get 55,000+ 4K Reels across 4 Best-Selling Collections for 90% OFF Today!',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prod-1', 'prod-2', 'prod-3', 'prod-4'],
    offerPrice: 499,
    originalPrice: 6499,
    discount: 92,
    ctaText: 'UNLOCK ALL 4 BUNDLES NOW (₹499)',
    description: 'Includes all 4 of our best-selling Reels collections for Meta Ads traffic.',
    benefits: [
      '55,000+ Unbranded HD & 4K Ready-to-Post Reels',
      'Covers Luxury, AI, Business, Fitness & Travel',
      '100% Monetization & Meta Ads Compliant',
      'Instant Lifetime Google Drive Vault Access'
    ],
    status: 'published'
  },
  {
    id: 'off-4',
    name: '4. All Products Complete Collection Vault Page',
    offerType: 'all-products',
    slug: 'all-in-one-vault',
    heading: '👑 ALL-IN-ONE VIRAL DIGITAL REELS VAULT',
    subheading: 'Complete Library Access to Every Single Reels Bundle on EXE DIGITAL WORLD!',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prod-1', 'prod-2', 'prod-3', 'prod-4'],
    offerPrice: 699,
    originalPrice: 9999,
    discount: 93,
    ctaText: 'UNLOCK COMPLETE REELS VAULT (₹699)',
    description: 'Full store collection landing page featuring every published digital bundle.',
    benefits: [
      'Complete Access to All Published Reels Collections',
      'Unrestricted Commercial & Resell License',
      'Free Lifetime Monthly Content Updates'
    ],
    status: 'published'
  }
];

// ZERO FINANCIAL / ORDER DATA RESET
export const DEFAULT_ORDERS = [];

// Storage Initialization Helper
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

  // Force re-initialization of Meta Ads Landing Pages System
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
  
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  }
}

// Data API Services

export function getProducts() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
}

export function getProductBySlug(slug) {
  const products = getProducts();
  return products.find(p => p.slug === slug || p.id === slug) || null;
}

export function saveProduct(productData) {
  const products = getProducts();
  let updated;
  if (productData.id) {
    updated = products.map(p => p.id === productData.id ? { ...p, ...productData } : p);
  } else {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 0,
      status: productData.status || 'published'
    };
    updated = [newProduct, ...products];
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  return updated;
}

export function deleteProduct(productId) {
  const products = getProducts().filter(p => p.id !== productId);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return products;
}

export function getCategories() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
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
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
  return updated;
}

export function getReviews(productId = null) {
  initStorage();
  const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
  if (productId) {
    return reviews.filter(r => r.productId === productId && r.status === 'published');
  }
  return reviews;
}

export function saveReview(reviewData) {
  const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
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
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
  return updated;
}

export function deleteReview(reviewId) {
  const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]').filter(r => r.id !== reviewId);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  return reviews;
}

export function getOffers() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFERS) || '[]');
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
    updated = [newOffer, ...offers];
  }
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updated));
  return updated;
}

export function deleteOffer(offerId) {
  const offers = getOffers().filter(o => o.id !== offerId);
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  return offers;
}

export function getOrders() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
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
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
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
