import React from "react";
import Star from "@/shared/assets/icons/star.svg";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div
      aria-label={`별점 ${rating.toFixed(1)}점`}
      className="flex items-center"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : star <= rating
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
