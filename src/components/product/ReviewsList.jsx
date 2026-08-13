import React from 'react';
import RatingStars from '../common/RatingStars';
import { CheckCircle2, ThumbsUp, MessageSquare } from 'lucide-react';

export default function ReviewsList({ reviews = [], rating = 4.9, totalReviews = 100 }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-10 text-center text-slate-400 glass-card p-8 rounded-2xl border border-slate-800">
        <MessageSquare className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-50" />
        <p className="text-sm font-semibold">No reviews yet for this product.</p>
        <p className="text-xs text-slate-500">Be the first creator to share your feedback!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      {/* Header & Rating Breakdown */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="font-display font-extrabold text-4xl sm:text-5xl text-white">
            {rating}
          </div>
          <div>
            <RatingStars rating={rating} showText={false} size="lg" />
            <p className="text-xs font-semibold text-slate-300 mt-1">
              Based on {totalReviews} verified creator reviews
            </p>
            <span className="text-[10px] text-emerald-400 font-medium">99.4% Positive Satisfaction Rating</span>
          </div>
        </div>

        <div className="w-full md:w-64 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>5 Star</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full w-[94%]"></div>
            </div>
            <span>94%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>4 Star</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gold/70 rounded-full w-[5%]"></div>
            </div>
            <span>5%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>3 Star</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gold/40 rounded-full w-[1%]"></div>
            </div>
            <span>1%</span>
          </div>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-card p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.customerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {rev.customerName}
                      {rev.isVerified && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Verified Purchase
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <RatingStars rating={rev.starRating} showText={false} />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{rev.reviewText}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                Helpful (14)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">EXE VERIFIED REVIEW</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
