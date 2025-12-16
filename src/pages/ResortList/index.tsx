import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { MapPin, SlidersHorizontal, Grid3X3, List, SearchX } from 'lucide-react';
import ResortCard from '../../components/ResortSection/ResortCard';
import ResortCardSkeleton from '../../components/ResortSection/ResortCard/ResortCardSkeleton';
import ResortFilter from '../../components/ResortSection/Filter';
import SearchBar from '../../components/ResortSection/SearchBar';
import { searchResorts, type Resort } from '../../services/resortService';

function ResortList() {
  const [searchParams] = useSearchParams();
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          name: searchParams.get('name') || '',
          checkin: searchParams.get('checkin') || '',
          checkout: searchParams.get('checkout') || '',
          number: parseInt(searchParams.get('number') || '2'),
        };

        const data = await searchResorts(params);
        setResorts(data);
      } catch (err) {
        setError('Không thể tải danh sách resort. Vui lòng thử lại.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, [searchParams]);

  const locationName = searchParams.get('name') || 'Tất cả địa điểm';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30">
      {/* Search Bar */}
      <SearchBar />

      {/* Results Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-[73px] z-10">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                {locationName}
              </h1>
              <p className="text-sm text-slate-500">
                {loading ? 'Đang tìm kiếm...' : `${resorts.length} kết quả được tìm thấy`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filter Section - Left */}
          <ResortFilter />

          {/* Resort Cards - Right */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col gap-5">
                {[...Array(3)].map((_, i) => (
                  <ResortCardSkeleton key={i} />
                ))}
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <SearchX size={32} className="text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Đã xảy ra lỗi</h3>
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {/* Empty State */}
            {!loading && !error && resorts.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <SearchX size={40} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Không có resort nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm địa điểm khác.
                </p>
              </div>
            )}
            
            {/* Results */}
            {!loading && !error && resorts.map((resort) => (
              <ResortCard
                key={resort.id}
                id={resort.id}
                name={resort.name}
                address={resort.address}
                images={resort.images}
                rating={resort.rating}
                reviews=""
                priceOriginal={resort.min_price}
                priceDiscounted={resort.min_price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResortList;
