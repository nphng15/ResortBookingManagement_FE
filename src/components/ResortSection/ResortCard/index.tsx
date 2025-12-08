import React from 'react'
import CardImagePreview from './CardImagePreview';
import ResortName from '../components/ResortName';
import ResortRating from '../components/ResortRating';
import ResortAddress from '../components/ResortAddress';
import ServiceTag from './ServiceTag';
import Price from '../components/Price';
import { Star, Building2, ThumbsUp } from 'lucide-react'; 

interface ResortCardProps {
  name: string;
  address: string;
  images: string[];
  rating: number;
  priceDiscounted: number;
}

function ResortCard({name, address, images, rating, priceDiscounted}: ResortCardProps) {
  return (
    <div className="flex justify-between gap-5 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white w-full max-w-[1000px]">
      {/* Left: Image */}
      <CardImagePreview images={images} alt={name}/>

      {/* Middle: Info + Rating */}
      <div className="flex flex-col justify-between flex-[1.8] min-w-[45%]">
        {/* Header: Resort name + Rating (cùng hàng) */}
        <div className="flex justify-between items-start">
          <div>
            {/* Resort Name */}
            <ResortName name={name} />

            {/* Hotels + stars + badge */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
            </div>

            {/* Address */}
            <ResortAddress address={address} />

            {/* Tags: same line */}
            <div className="flex gap-2 mt-2 flex-nowrap overflow-x-auto">
              <ServiceTag label="Free Cancellation" color="bg-green-100 text-green-700" />
              <ServiceTag label="Coupons up to 200K" color="bg-blue-50 text-blue-700" />
            </div>
          </div>

          {/* Rating moved here */}
          <div className="flex flex-col items-end text-right text-gray-700 text-sm leading-tight">
            <div className="flex items-baseline space-x-1">
              <span className="text-blue-600 font-semibold text-lg leading-none">9.2</span>
              <span className="text-gray-500 text-sm leading-none">(1.2K reviews)</span>
            </div>
            <span className="text-gray-700 text-sm mt-0.5">Exceptional</span>
          </div>

        </div>
      </div>

      {/* Right: Price */}
      <div className="w-[25%] p-4 border-l border-gray-200 flex flex-col justify-center text-right">
        <p className="text-xl font-semibold text-red-600">
          {priceDiscounted.toLocaleString()} VND
        </p>

        <button className="mt-3 bg-blue-500 text-white text-sm font-medium py-1.5 px-3 rounded-md hover:bg-green-700 w-fit ml-auto">
          Select Room
        </button>
      </div>
    </div>
  );
};

export default ResortCard
