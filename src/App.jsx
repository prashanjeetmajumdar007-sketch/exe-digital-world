import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MetaPixelToast from './components/common/MetaPixelToast';
import SocialProofToast from './components/common/SocialProofToast';
import CheckoutModal from './components/checkout/CheckoutModal';
import AdminLoginModal from './admin/AdminLoginModal';

import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import OfferLandingPage from './pages/OfferLandingPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import AdminDashboard from './pages/AdminDashboard';

import { getProducts, getProductBySlug, getOfferBySlug, isAdminLoggedIn } from './services/storage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname || '/');
  const [products, setProducts] = useState(getProducts());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTarget, setCheckoutTarget] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(isAdminLoggedIn());

  // Handle URL Routing & Path Parsing
  useEffect(() => {
    const handlePopState = () => {
      parsePath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    parsePath(window.location.pathname);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const parsePath = (path) => {
    setCurrentRoute(path);

    if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '');
      const prod = getProductBySlug(slug);
      if (prod) {
        setSelectedProduct(prod);
      }
    } else if (path.startsWith('/offer/')) {
      const slug = path.replace('/offer/', '');
      const off = getOfferBySlug(slug);
      if (off) {
        setSelectedOffer(off);
      }
    }
  };

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    parsePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Product Detail Page
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    navigateTo(`/product/${product.slug}`);
  };

  // Open Offer Landing Page
  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    navigateTo(`/offer/${offer.slug}`);
  };

  // Quick Buy Trigger
  const handleQuickBuy = (item) => {
    setCheckoutTarget(item);
    setIsCheckoutOpen(true);
  };

  // Handle Order Completed
  const handleOrderCompleted = (orderRecord) => {
    setCompletedOrder(orderRecord);
    navigateTo(`/order-success?orderId=${orderRecord.id}`);
  };

  // Admin Access Handler
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn()) {
      setIsAdminAuthenticated(true);
      navigateTo('/admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070D] text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Header Navbar */}
      <Navbar
        onNavigate={navigateTo}
        currentRoute={currentRoute}
        onOpenAdmin={handleOpenAdmin}
        onOpenCart={() => setIsCheckoutOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onQuickBuy={handleQuickBuy}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute.startsWith('/product/') && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBuyNow={handleQuickBuy}
            onBack={() => navigateTo('/reels-bundles')}
          />
        )}

        {currentRoute.startsWith('/offer/') && selectedOffer && (
          <OfferLandingPage
            offer={selectedOffer}
            onBuyNow={handleQuickBuy}
            onNavigate={navigateTo}
          />
        )}

        {(currentRoute === '/reels-bundles' || currentRoute === '/best-sellers') && (
          <CategoryProductsPage
            products={products}
            onSelectProduct={handleSelectProduct}
            onQuickBuy={handleQuickBuy}
          />
        )}

        {currentRoute.startsWith('/order-success') && (
          <OrderSuccessPage
            order={completedOrder}
            onGoHome={() => navigateTo('/')}
          />
        )}

        {currentRoute === '/admin' && (
          isAdminAuthenticated ? (
            <AdminDashboard
              onNavigate={navigateTo}
              onSelectProduct={handleSelectProduct}
              onPreviewOffer={handleSelectOffer}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <h2 className="text-xl font-bold text-white">Admin Authentication Required</h2>
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-extrabold text-xs"
              >
                Login to Admin Dashboard
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Modals & Telemetry Toasts */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        product={checkoutTarget}
        offer={checkoutTarget}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderCompleted}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminAuthenticated(true);
          setIsAdminLoginOpen(false);
          navigateTo('/admin');
        }}
      />

      {/* Conversion Boosters */}
      <MetaPixelToast />
      <SocialProofToast />

    </div>
  );
}
