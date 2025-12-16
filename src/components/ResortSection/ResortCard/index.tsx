import { useNavigate } from 'react-router';
import CardImagePreview from './CardImagePreview';
import { Star, MapPin, Sparkles, BadgeCheck, Heart } from 'lucide-react'; 

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

function ResortCard({id, name, address, images, rating, reviews, priceOriginal, priceDiscounted}: ResortCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/resort/${id}`);
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
      className="group relative flex bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Left: Image */}
      <div className="relative w-[280px] flex-shrink-0">
        <CardImagePreview images={images} alt={name}/>
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <Heart size={18} className="text-slate-400 hover:text-red-500 transition-colors" />
        </button>

        {/* Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium shadow-lg">
          <Sparkles size={12} />
          <span>Được yêu thích</span>
        </div>
      </div>

      {/* Middle: Info */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* Resort Name */}
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                {name}
              </h3>

              {/* Stars */}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-400">Resort</span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                <MapPin size={14} className="flex-shrink-0" />
                <span className="text-sm line-clamp-1">{address}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-end flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-slate-500">{getRatingLabel(displayRating)}</p>
                  <p className="text-xs text-slate-400">1.2K đánh giá</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
                  {displayRating.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
              <BadgeCheck size={12} />
              Miễn phí hủy phòng
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
              <Sparkles size={12} />
              Giảm đến 200K
            </span>
          </div>
        </div>
      </div>

      {/* Right: Price */}
      <div className="w-[200px] p-5 bg-gradient-to-br from-slate-50 to-blue-50/50 border-l border-slate-100 flex flex-col justify-center">
        <div className="text-right">
          <p className="text-xs text-slate-500 mb-1">Giá mỗi đêm từ</p>
          {priceOriginal > priceDiscounted && (
            <p className="text-sm text-slate-400 line-through">
              {priceOriginal.toLocaleString('vi-VN')}đ
            </p>
          )}
          <p className="text-2xl font-bold text-slate-800">
            {priceDiscounted.toLocaleString('vi-VN')}
            <span className="text-sm font-normal text-slate-500">đ</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Đã bao gồm thuế & phí</p>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); navigate(`/resort/${id}`); }}
          className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
        >
          Chọn phòng
        </button>
      </div>
    </div>
  );
}

export default ResortCard
