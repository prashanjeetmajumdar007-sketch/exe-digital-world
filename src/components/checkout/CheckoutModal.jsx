import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, ArrowRight, Loader2, Zap, CreditCard } from 'lucide-react';
import { processPayment, PAYMENT_PROVIDERS } from '../../services/paymentService';
import { createOrder, formatINR } from '../../services/storage';
import { MetaPixel } from '../../services/metaPixel';

export default function CheckoutModal({ product, offer, isOpen, onClose, onOrderSuccess }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(PAYMENT_PROVIDERS.INSTANT_UPI);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const targetItem = product || offer;
  const itemTitle = targetItem ? targetItem.name : 'Viral Reels Bundle';
  const price = targetItem ? (targetItem.salePrice || targetItem.offerPrice || 299) : 299;
  const originalPrice = targetItem ? (targetItem.originalPrice || 1999) : 1999;
  const deliveryLink = targetItem?.deliveryLink || 'https://drive.google.com/drive/folders/exe-25k-reels-bundle-secure-vault';

  useEffect(() => {
    if (isOpen && targetItem) {
      MetaPixel.initiateCheckout(targetItem, price);
    }
  }, [isOpen, targetItem, price]);

  if (!isOpen || !targetItem) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMsg('Please complete all contact details for instant digital delivery access.');
      return;
    }

    setIsProcessing(true);

    try {
      const txnResult = await processPayment({
        provider: selectedProvider,
        amount: price,
        customer: { name: customerName, email: customerEmail, phone: customerPhone },
        items: [{ productId: targetItem.id, productName: itemTitle, price }]
      });

      const orderRecord = createOrder({
        customerName,
        customerEmail,
        customerPhone,
        items: [{ productId: targetItem.id, productName: itemTitle, price, quantity: 1 }],
        totalAmount: price,
        paymentStatus: 'success',
        paymentMethod: selectedProvider === PAYMENT_PROVIDERS.INSTANT_UPI ? 'Instant UPI / QR' : 'Credit / Debit Card / NetBanking',
        deliveryLink
      });

      MetaPixel.purchase(orderRecord);

      setIsProcessing(false);
      onClose();
      onOrderSuccess(orderRecord);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setErrorMsg(err.message || 'Payment processing failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-slate-700 bg-[#090D17] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">
                Secure Express Checkout
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit Encrypted Instant Digital Access
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* Order Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">SELECTED DIGITAL ITEM</span>
                <h4 className="font-bold text-sm sm:text-base text-white">{itemTitle}</h4>
                <p className="text-xs text-slate-400">Instant Google Drive Vault Access + Lifetime Commercial License</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-display font-extrabold text-xl text-white">{formatINR(price)}</span>
                <span className="text-xs text-slate-500 line-through block">{formatINR(originalPrice)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Total Savings: {formatINR(originalPrice - price)} (85%+ OFF)
              </span>
              <span className="text-slate-300">Total: {formatINR(price)}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Customer Form */}
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address (For Delivery) *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Payment Provider Options */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Payment Method
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedProvider(PAYMENT_PROVIDERS.INSTANT_UPI)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    selectedProvider === PAYMENT_PROVIDERS.INSTANT_UPI
                      ? 'bg-cyan-500/10 border-cyan-500 text-white'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h5 className="text-xs font-bold">Instant UPI / QR</h5>
                    <p className="text-[10px] text-slate-400">GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedProvider(PAYMENT_PROVIDERS.CREDIT_CARD)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    selectedProvider === PAYMENT_PROVIDERS.CREDIT_CARD
                      ? 'bg-cyan-500/10 border-cyan-500 text-white'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <div>
                    <h5 className="text-xs font-bold">Cards / NetBanking</h5>
                    <p className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-4 py-4 rounded-xl font-display font-extrabold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Order & Verifying Payment...
                </>
              ) : (
                <>
                  <span>COMPLETE PURCHASE ({formatINR(price)})</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer Guarantee */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-center text-[11px] text-slate-400 flex items-center justify-center gap-4">
          <span>🔒 256-Bit SSL Encryption</span>
          <span>⚡ Instant Auto-Download</span>
          <span>🛡️ Lifetime License</span>
        </div>

      </div>
    </div>
  );
}
