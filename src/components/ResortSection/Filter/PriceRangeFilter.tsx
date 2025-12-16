import { useState } from 'react';

interface PriceRangeFilterProps {
  onPriceChange?: (min: number, max: number) => void;
}

function PriceRangeFilter({ onPriceChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(24000000);

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    onPriceChange?.(minPrice, value);
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(24000000);
    onPriceChange?.(0, 24000000);
  };

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

      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="24000000"
          step="100000"
          value={maxPrice}
          onChange={handleMaxChange}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-slate-50/50">
            {minPrice.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <span className="text-slate-400">—</span>
        <div className="flex-1">
          <div className="px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-slate-50/50">
            {maxPrice.toLocaleString('vi-VN')}đ
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceRangeFilter;
