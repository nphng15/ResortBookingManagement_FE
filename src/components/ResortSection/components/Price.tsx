import React from 'react'

interface PriceProps {
  original: number;
  discounted: number;
  note?: string;
}

function Price({original, discounted, note}: PriceProps) {
  return (
    <div className="text-right">
      <p className="text-gray-400 line-through text-sm">
        {original.toLocaleString()} VND
      </p>
      <p className="text-[#d32f2f] font-semibold text-[22px] leading-tight">
        {discounted.toLocaleString()} VND
      </p>
      {note && (
        <p className="text-xs text-[#d32f2f] mt-1 font-medium">{note}</p>
      )}
    </div>
  );
}

export default Price;
