import { Star } from 'lucide-react'

interface ResortRatingProps {
  score: number
  reviews: string
  className?: string
}

function ResortRating({ score, reviews, className = '' }: ResortRatingProps) {
  return (
    <div className={`flex items-center gap-2 text-sm mt-1 ${className}`}>
      <div className="flex text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="#f5c518" />
        ))}
      </div>
      <span className="text-[#0071c2] font-semibold text-[15px]">{score}</span>
      <span className="text-gray-500">({reviews} reviews)</span>
    </div>
  )
}

export default ResortRating
