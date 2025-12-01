import React from 'react'
import { Star } from "lucide-react";

interface ResortRatingProps {
  score: number;
  reviews: string;
  label?: string;
}

function ResortRating({score, reviews, label}: ResortRatingProps) {
  return (
    <div className="flex items-center gap-2 text-sm mt-1">
      <div className="flex text-yellow-500">
        {Array.from({ length: 5}).map((_, i) => (
          <Star key={i} size={14} fill="#f5c518" />
        ))}
      </div>
      <span className="text-[12px] bg-green-100 text-green-700 font-medium px-1.5 py-[1px] rounded">
        No. 1 in Luxury Hotel & Resort
      </span>
      <span className="ml-auto text-[#0071c2] font-semibold text-[15px]">
        {score}
      </span>
      <span className="text-gray-500">({reviews} reviews)</span>
      <span className="text-gray-400">{label}</span>
    </div>
  );
}

export default ResortRating
