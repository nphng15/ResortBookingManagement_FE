import { Map } from 'lucide-react';
import PriceRangeFilter from './PriceRangeFilter';
import StarRatingFilter from './StarRatingFilter';
import NeighborhoodsFilter from './NeighborhoodsFilter';

export interface FilterValues {
  minPrice: number;
  maxPrice: number;
  ratings: number[];
}

interface ResortFilterProps {
  onFilterChange?: (filters: FilterValues) => void;
  filters?: FilterValues;
}

function ResortFilter({ onFilterChange, filters }: ResortFilterProps) {
  const handlePriceChange = (min: number, max: number) => {
    onFilterChange?.({
      minPrice: min,
      maxPrice: max,
      ratings: filters?.ratings || [],
    });
  };

  const handleRatingChange = (ratings: number[]) => {
    onFilterChange?.({
      minPrice: filters?.minPrice || 0,
      maxPrice: filters?.maxPrice || 24000000,
      ratings,
    });
  };

  return (
    <div className="w-[320px] h-fit sticky top-[140px] flex flex-col gap-4">
      {/* Explore on Map */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
        <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.7267535!2d109.1943!3d12.2388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE0JzE5LjciTiAxMDnCsDExJzM5LjUiRQ!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200">
            <Map size={18} />
            <span>Xem trên bản đồ</span>
          </button>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Bộ lọc tìm kiếm</h3>
        </div>
        
        {/* Price Range Filter */}
        <PriceRangeFilter 
          onPriceChange={handlePriceChange}
          minPrice={filters?.minPrice}
          maxPrice={filters?.maxPrice}
        />

        {/* Star Rating Filter */}
        <StarRatingFilter 
          onRatingChange={handleRatingChange}
          selectedRatings={filters?.ratings}
        />

        {/* Neighborhoods Filter */}
        <NeighborhoodsFilter />
      </div>
    </div>
  );
}

export default ResortFilter;
