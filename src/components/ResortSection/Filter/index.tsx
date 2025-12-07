import PriceRangeFilter from './PriceRangeFilter';
import StarRatingFilter from './StarRatingFilter';
import NeighborhoodsFilter from './NeighborhoodsFilter';

function ResortFilter() {
  return (
    <div className="w-80 h-fit sticky top-4">
      {/* Explore on Map */}
      <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-sm">
        <div className="h-48 bg-gray-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.7267535!2d109.1943!3d12.2388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE0JzE5LjciTiAxMDnCsDExJzM5LjUiRQ!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="p-4 text-center">
          <button className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-blue-700 transition w-full">
            Explore on Map
          </button>
        </div>
      </div>

      {/* Price Range Filter */}
      <PriceRangeFilter />

      {/* Star Rating Filter */}
      <StarRatingFilter />

      <NeighborhoodsFilter/>
    </div>
  );
}

export default ResortFilter;
