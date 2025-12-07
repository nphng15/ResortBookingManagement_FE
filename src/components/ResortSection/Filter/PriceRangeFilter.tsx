import { useState } from 'react';

interface PriceRangeFilterProps {
  onPriceChange?: (min: number, max: number) => void;
}

function PriceRangeFilter({ onPriceChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(24000000);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    onPriceChange?.(value, maxPrice);
  };

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
    <div className="bg-white rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">Price Range</h3>
          <p className="text-sm text-gray-500">Per room, per night</p>
        </div>
        <button 
          onClick={handleReset}
          className="text-blue-500 text-sm font-medium hover:text-blue-600"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 mb-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="24000000"
            step="100000"
            value={maxPrice}
            onChange={handleMaxChange}
            className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={minPrice.toLocaleString()}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-gray-50"
          />
          <span className="text-xs text-gray-500 ml-1">VND</span>
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={maxPrice.toLocaleString()}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-gray-50"
          />
          <span className="text-xs text-gray-500 ml-1">VND</span>
        </div>
      </div>
    </div>
  );
}

export default PriceRangeFilter;
