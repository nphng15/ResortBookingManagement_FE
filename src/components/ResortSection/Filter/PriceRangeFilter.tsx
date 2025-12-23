import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  onPriceChange?: (min: number, max: number) => void;
  minPrice?: number;
  maxPrice?: number;
}

const MIN_PRICE = 0;
const MAX_PRICE = 24000000;

function PriceRangeFilter({ onPriceChange, minPrice: propMinPrice, maxPrice: propMaxPrice }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState(propMinPrice ?? MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(propMaxPrice ?? MAX_PRICE);

  useEffect(() => {
    if (propMinPrice !== undefined) setMinPrice(propMinPrice);
    if (propMaxPrice !== undefined) setMaxPrice(propMaxPrice);
  }, [propMinPrice, propMaxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100000);
    setMinPrice(value);
    onPriceChange?.(value, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 100000);
    setMaxPrice(value);
    onPriceChange?.(minPrice, value);
  };

  const handleReset = () => {
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
    onPriceChange?.(MIN_PRICE, MAX_PRICE);
  };

  const minPercent = (minPrice / MAX_PRICE) * 100;
  const maxPercent = (maxPrice / MAX_PRICE) * 100;

  return (
    <div className="p-4 border-b border-slate-100">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium text-slate-800">Khoảng giá</h4>
        <button 
          onClick={handleReset}
          className="text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors"
        >
          Đặt lại
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-4">Mỗi phòng, mỗi đêm</p>

      {/* Dual Range Slider */}
      <div className="relative mb-6 h-6">
        {/* Track background */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-slate-200 rounded-full" />
        
        {/* Active track */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        
        {/* Min slider */}
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100000}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
        />
        
        {/* Max slider */}
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100000}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-slate-50/50 text-center">
            {minPrice.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <span className="text-slate-400">—</span>
        <div className="flex-1">
          <div className="px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-slate-50/50 text-center">
            {maxPrice.toLocaleString('vi-VN')}đ
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceRangeFilter;
