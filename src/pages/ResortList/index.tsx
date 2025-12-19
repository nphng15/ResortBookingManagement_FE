import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { MapPin, SlidersHorizontal, Grid3X3, List, SearchX } from 'lucide-react';
import ResortCard from '../../components/ResortSection/ResortCard';
import ResortCardSkeleton from '../../components/ResortSection/ResortCard/ResortCardSkeleton';
import ResortFilter from '../../components/ResortSection/Filter';
import SearchBar from '../../components/ResortSection/SearchBar';
import { searchResorts, type Resort } from '../../services/resortService';
import { useChristmasTheme } from '../../components/ChristmasTheme';

function ResortList() {
  const [searchParams] = useSearchParams();
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { isChristmasTheme } = useChristmasTheme();

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
    <div className={`min-h-screen ${isChristmasTheme ? 'bg-gradient-to-b from-red-50 via-green-50/30 to-red-50/50' : 'bg-gradient-to-b from-slate-50 to-blue-50/30'}`}>
      {/* Search Bar */}
      <SearchBar />

      {/* Results Header */}
      <div className={`backdrop-blur-sm border-b sticky top-[73px] z-10 ${
        isChristmasTheme 
          ? 'bg-gradient-to-r from-red-50/90 to-green-50/90 border-red-200/60'
          : 'bg-white/80 border-slate-200/60'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
              isChristmasTheme 
                ? 'bg-gradient-to-br from-red-600 to-green-700 shadow-red-500/20'
                : 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/20'
            }`}>
              {isChristmasTheme ? (
                <span className="text-lg"></span>
              ) : (
                <MapPin size={20} className="text-white" />
              )}
            </div>
            <div>
              <h1 className={`text-xl font-semibold ${isChristmasTheme ? 'text-red-800' : 'text-slate-800'}`}>
                {isChristmasTheme && '️ '}{locationName}
              </h1>
              <p className={`text-sm ${isChristmasTheme ? 'text-green-700' : 'text-slate-500'}`}>
                {loading ? 'Đang tìm kiếm...' : `${resorts.length} kết quả được tìm thấy`}
                {isChristmasTheme && !loading && ' '}
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
              <div className={`border rounded-2xl p-8 text-center ${
                isChristmasTheme ? 'bg-red-50 border-red-200' : 'bg-red-50 border-red-100'
              }`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isChristmasTheme ? 'bg-red-200' : 'bg-red-100'
                }`}>
                  <SearchX size={32} className="text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Đã xảy ra lỗi</h3>
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {/* Empty State */}
            {!loading && !error && resorts.length === 0 && (
              <div className={`rounded-2xl border p-12 text-center shadow-sm ${
                isChristmasTheme 
                  ? 'bg-gradient-to-br from-white to-red-50 border-red-200'
                  : 'bg-white border-slate-200'
              }`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  isChristmasTheme 
                    ? 'bg-gradient-to-br from-red-100 to-green-100'
                    : 'bg-gradient-to-br from-slate-100 to-slate-200'
                }`}>
                  {isChristmasTheme ? (
                    <span className="text-4xl">🎅</span>
                  ) : (
                    <SearchX size={40} className="text-slate-400" />
                  )}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isChristmasTheme ? 'text-red-800' : 'text-slate-700'}`}>
                  {isChristmasTheme ? ' Không tìm thấy kết quả' : 'Không tìm thấy kết quả'}
                </h3>
                <p className={`max-w-md mx-auto ${isChristmasTheme ? 'text-green-700' : 'text-slate-500'}`}>
                  {isChristmasTheme 
                    ? 'Không có resort nào phù hợp. Hãy thử đổi địa điểm để tìm kỳ nghỉ Giáng sinh hoàn hảo! '
                    : 'Không có resort nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm địa điểm khác.'}
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

