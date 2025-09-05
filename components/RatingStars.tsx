'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  variant?: 'interactive' | 'static';
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  variant = 'static',
  onRatingChange,
  className,
}: RatingStarsProps) {
  const isInteractive = variant === 'interactive';

  const handleStarClick = (starRating: number) => {
    if (isInteractive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        
        return (
          <Star
            key={index}
            className={cn(
              'w-4 h-4 transition-colors duration-200',
              isFilled 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-400',
              isInteractive && 'cursor-pointer hover:text-yellow-400'
            )}
            onClick={() => handleStarClick(starRating)}
          />
        );
      })}
      <span className="ml-2 text-sm text-purple-200">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
