import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5, reviewsCount, showText = true, size = 'sm' }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const sizeClasses = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-gold">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${sizeClasses} ${
              star <= Math.floor(rating)
                ? 'fill-gold text-gold'
                : star - 0.5 <= rating
                ? 'fill-gold/50 text-gold'
                : 'text-slate-600'
            }`}
          />
        ))}
      </div>
      {showText && (
        <span className="text-xs font-bold text-slate-200">
          {rating} {reviewsCount !== undefined && <span className="text-slate-400 font-normal">({reviewsCount})</span>}
        </span>
      )}
    </div>
  );
}
