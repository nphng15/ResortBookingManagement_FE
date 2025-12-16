import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';

interface StarRatingFilterProps {
  onRatingChange?: (ratings: number[]) => void;
}

function StarRatingFilter({ onRatingChange }: StarRatingFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const ratings = [5, 4, 3, 2, 1];

  const handleRatingToggle = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    
    setSelectedRatings(newRatings);
    onRatingChange?.(newRatings);
  };

  return (
    <div className="p-4 border-b border-slate-100">
      <div 
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="font-medium text-slate-800">Hạng sao</h4>
        <ChevronDown 
          size={16} 
          className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label 
              key={rating}
              className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                selectedRatings.includes(rating) 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingToggle(rating)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-slate-200" />
                ))}
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default StarRatingFilter;
