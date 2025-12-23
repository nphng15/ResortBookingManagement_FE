import { useNavigate, useSearchParams } from 'react-router';
import CardImagePreview from './CardImagePreview';
import { Star, MapPin, Sparkles, BadgeCheck, Heart } from 'lucide-react'; 
import { useChristmasTheme } from '../../../components/ChristmasTheme';

interface ResortCardProps {
  id: number;
  name: string;
  address: string;
  images: string[];
  rating: number;
  reviews: string;
  priceOriginal: number;
  priceDiscounted: number;
}

function ResortCard({id, name, address, images, rating, reviews: _reviews, priceOriginal, priceDiscounted}: ResortCardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isChristmasTheme } = useChristmasTheme();

  const getResortUrl = () => {
    const params = new URLSearchParams();
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const number = searchParams.get('number');
    
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    if (number) params.set('number', number);
    
    const queryString = params.toString();
    return `/resort/${id}${queryString ? `?${queryString}` : ''}`;
  };

  const handleCardClick = () => {
    navigate(getResortUrl());
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return 'Xuất sắc';
    if (rating >= 8) return 'Tuyệt vời';
    if (rating >= 7) return 'Rất tốt';
    return 'Tốt';
  };

  const displayRating = rating || 9.2;

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative flex rounded-2xl border shadow-sm transition-all duration-300 cursor-pointer overflow-hidden ${
        isChristmasTheme 
          ? 'bg-gradient-to-r from-white to-red-50/50 border-red-200/80 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300'
          : 'bg-white border-slate-200/80 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200'
      }`}
    >
      {/* Left: Image */}
      <div className="relative w-[280px] flex-shrink-0">
        <CardImagePreview images={images} alt={name}/>
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 ${
            isChristmasTheme ? 'bg-white/95 hover:bg-white' : 'bg-white/90 hover:bg-white'
          }`}
        >
          <Heart size={18} className={`transition-colors ${isChristmasTheme ? 'text-red-400 hover:text-red-600' : 'text-slate-400 hover:text-red-500'}`} />
        </button>

      </div>

      {/* Middle: Info */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* Resort Name */}
              <h3 className={`text-lg font-semibold transition-colors line-clamp-1 ${
                isChristmasTheme 
                  ? 'text-red-800 group-hover:text-red-600'
                  : 'text-slate-800 group-hover:text-blue-600'
              }`}>
                {name}
              </h3>

              {/* Stars */}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={`fill-current ${isChristmasTheme ? 'text-yellow-500' : 'text-amber-400'}`} />
                  ))}
                </div>
                <span className={`text-xs ${isChristmasTheme ? 'text-green-600' : 'text-slate-400'}`}>Resort</span>
              </div>

              {/* Address */}
              <div className={`flex items-center gap-1.5 mt-2 ${isChristmasTheme ? 'text-green-700' : 'text-slate-500'}`}>
                <MapPin size={14} className="flex-shrink-0" />
                <span className="text-sm line-clamp-1">{address}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-end flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className={`text-xs ${isChristmasTheme ? 'text-green-600' : 'text-slate-500'}`}>{getRatingLabel(displayRating)}</p>
                  <p className={`text-xs ${isChristmasTheme ? 'text-red-400' : 'text-slate-400'}`}>1.2K đánh giá</p>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                  isChristmasTheme 
                    ? 'bg-gradient-to-br from-red-600 to-green-700 shadow-red-500/25'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/25'
                }`}>
                  {displayRating.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
              isChristmasTheme 
                ? 'bg-green-100 text-green-800'
                : 'bg-emerald-50 text-emerald-700'
            }`}>
              <BadgeCheck size={12} />
              {isChristmasTheme ? ' Miễn phí hủy' : 'Miễn phí hủy phòng'}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
              isChristmasTheme 
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-50 text-blue-700'
            }`}>
              {isChristmasTheme ? '' : <Sparkles size={12} />}
              {isChristmasTheme ? 'Giảm Noel 30%' : 'Giảm đến 200K'}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Price */}
      <div className={`w-[200px] p-5 border-l flex flex-col justify-center ${
        isChristmasTheme 
          ? 'bg-gradient-to-br from-red-50 to-green-50/50 border-red-100'
          : 'bg-gradient-to-br from-slate-50 to-blue-50/50 border-slate-100'
      }`}>
        <div className="text-right">
          <p className={`text-xs mb-1 ${isChristmasTheme ? 'text-green-600' : 'text-slate-500'}`}>
            {isChristmasTheme ? ' Giá Giáng sinh từ' : 'Giá mỗi đêm từ'}
          </p>
          {priceOriginal > priceDiscounted && (
            <p className={`text-sm line-through ${isChristmasTheme ? 'text-red-300' : 'text-slate-400'}`}>
              {priceOriginal.toLocaleString('vi-VN')}đ
            </p>
          )}
          <p className={`text-2xl font-bold ${isChristmasTheme ? 'text-red-700' : 'text-slate-800'}`}>
            {priceDiscounted.toLocaleString('vi-VN')}
            <span className={`text-sm font-normal ${isChristmasTheme ? 'text-green-600' : 'text-slate-500'}`}>đ</span>
          </p>
          <p className={`text-xs mt-0.5 ${isChristmasTheme ? 'text-green-500' : 'text-slate-400'}`}>Đã bao gồm thuế & phí</p>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); navigate(getResortUrl()); }}
          className={`mt-4 w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold shadow-lg transition-all duration-200 ${
            isChristmasTheme 
              ? 'bg-gradient-to-r from-red-600 to-green-700 hover:from-red-700 hover:to-green-800 shadow-red-500/25 hover:shadow-red-500/40'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 hover:shadow-blue-500/40'
          }`}
        >
          {isChristmasTheme ? ' Chọn phòng' : 'Chọn phòng'}
        </button>
      </div>
    </div>
  );
}

export default ResortCard

