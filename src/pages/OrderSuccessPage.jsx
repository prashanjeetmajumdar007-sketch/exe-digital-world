import React from 'react';
import { CheckCircle2, Download, ExternalLink, Copy, Check, Lock, Home } from 'lucide-react';
import { formatINR } from '../services/storage';

export default function OrderSuccessPage({ order, onGoHome }) {
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Order Not Found</h2>
        <p className="text-xs text-slate-400">Please check your email for access instructions or return home.</p>
        <button onClick={onGoHome} className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs">
          Return Home
        </button>
      </div>
    );
  }

  const deliveryUrl = order.deliveryLink || 'https://drive.google.com/drive/folders/exe-25k-reels-bundle-secure-vault';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deliveryUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
      
      {/* Thank You Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-950 text-center space-y-4 shadow-glow-cyan/10">
        
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow-cyan">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block uppercase">
          PAYMENT VERIFIED & SUCCESSFUL
        </span>

        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
          Thank You For Your Order!
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Your digital access link has been generated and activated. An automated receipt has also been dispatched to <strong className="text-cyan-400">{order.customerEmail}</strong>.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
          <span>Order ID:</span>
          <strong className="text-cyan-400">{order.id}</strong>
        </div>
      </div>

      {/* DIGITAL DELIVERY ACCESS BOX */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/40 space-y-6 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-lg text-white">
              Instant Cloud Download Vault
            </h3>
            <p className="text-xs text-slate-400">Click below to open your Google Drive folder and start downloading.</p>
          </div>
        </div>

        {/* Big Action Download Button */}
        <div className="space-y-3">
          <a
            href={deliveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01]"
          >
            <Download className="w-5 h-5 fill-black" />
            ACCESS & DOWNLOAD YOUR REELS VAULT
            <ExternalLink className="w-4 h-4 text-black" />
          </a>

          <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400 truncate font-mono text-[11px]">{deliveryUrl}</span>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-semibold shrink-0 flex items-center gap-1"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLink ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Protection & Instructions Notice */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
          <h4 className="font-bold text-white flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-cyan-400" />
            Download & Usage Instructions:
          </h4>
          <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
            <li>You can download individual video files or the entire folder as a single ZIP file.</li>
            <li>No editing software is mandatory — videos are ready to post directly to Instagram.</li>
            <li>You hold full commercial rights for personal accounts, Meta Ads, and client projects.</li>
          </ul>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Order Receipt Summary</h4>
        
        <div className="space-y-3">
          {(order.items || []).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60">
              <div>
                <span className="font-semibold text-slate-200 block">{item.productName}</span>
                <span className="text-[10px] text-slate-400">Qty: {item.quantity || 1} • Lifetime Access</span>
              </div>
              <span className="font-bold text-white font-mono">{formatINR(item.price)}</span>
            </div>
          ))}

          <div className="flex items-center justify-between text-xs pt-2 font-bold">
            <span className="text-slate-300">Total Paid:</span>
            <span className="text-cyan-400 font-mono text-sm">{formatINR(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* 24/7 Support Footer */}
      <div className="text-center space-y-3 pt-4">
        <p className="text-xs text-slate-400">
          Need help accessing your folder? Our 24/7 support team is available at <span className="text-cyan-400 font-mono">support@exedigitalworld.com</span>.
        </p>

        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs transition-colors"
        >
          <Home className="w-4 h-4 text-cyan-400" />
          Back to EXE DIGITAL WORLD
        </button>
      </div>

    </div>
  );
}
