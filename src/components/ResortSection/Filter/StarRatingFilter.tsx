import { useState } from 'react';
import { Star, ChevronUp } from 'lucide-react';

interface StarRatingFilterProps {
  onRatingChange?: (ratings: number[]) => void;
}

function StarRatingFilter({ onRatingChange }: StarRatingFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const ratings = [1, 2, 3, 4, 5];

  const handleRatingToggle = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    
    setSelectedRatings(newRatings);
    onRatingChange?.(newRatings);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-bold text-gray-900 text-lg">Star Rating</h3>
        <ChevronUp 
          size={20} 
          className={`text-blue-500 transition-transform ${isExpanded ? '' : 'rotate-180'}`}
        />
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {ratings.map((rating) => (
            <label 
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingToggle(rating)}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">{rating}</span>
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default StarRatingFilter;
