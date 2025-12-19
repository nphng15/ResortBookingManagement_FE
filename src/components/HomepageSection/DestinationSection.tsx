import { useNavigate } from 'react-router';
import { useChristmasTheme } from '../../components/ChristmasTheme';

interface DestinationCardProps {
  name: string;
  image: string;
  resortCount: number;
  onClick?: () => void;
  isChristmas: boolean;
}

function DestinationCard({ name, image, resortCount, onClick, isChristmas }: DestinationCardProps) {
  return (
    <div onClick={onClick} className="relative group cursor-pointer">
      <div className={`absolute -inset-0.5 rounded-3xl blur opacity-0 group-hover:opacity-60 transition duration-500 ${
        isChristmas 
          ? 'bg-gradient-to-r from-red-600 via-green-600 to-red-600'
          : 'bg-gradient-to-r from-violet-600 to-cyan-600'
      }`} />
      <div className="relative overflow-hidden rounded-3xl">
        {/* Christmas ribbon decoration */}
        {isChristmas && (
          <div className="absolute top-0 left-0 z-20">
            <div className="bg-red-600 text-white text-xs font-bold px-5 py-1 transform -rotate-45 -translate-x-4 translate-y-1 shadow-lg">
               Noel
            </div>
          </div>
        )}
        <div className="aspect-[4/3] overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className={`absolute inset-0 ${
          isChristmas 
            ? 'christmas-destination-overlay'
            : 'bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent'
        }`} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className={`text-2xl font-bold text-white mb-1 transition-colors duration-300 ${
            isChristmas 
              ? 'group-hover:text-yellow-300'
              : 'group-hover:text-violet-300'
          }`}>
            {name}
          </h3>
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm font-medium">{resortCount} resort</span>
          </div>
        </div>
        <div className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2 ${
          isChristmas ? 'bg-red-500/40' : 'bg-white/20'
        }`}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const destinations = [
  { id: 1, name: 'Đà Nẵng', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80', resortCount: 45 },
  { id: 2, name: 'Phú Quốc', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80', resortCount: 38 },
  { id: 3, name: 'Nha Trang', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80', resortCount: 52 },
  { id: 4, name: 'Hội An', image: 'https://images.unsplash.com/photo-1701397955118-79059690ef50?w=800&q=80', resortCount: 28 },
  { id: 5, name: 'Đà Lạt', image: 'https://images.unsplash.com/photo-1626608017817-211d7c48177d?w=800&q=80', resortCount: 35 },
  { id: 6, name: 'Vũng Tàu', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', resortCount: 22 },
];

function DestinationSection() {
  const navigate = useNavigate();
  const { isChristmasTheme } = useChristmasTheme();

  const handleDestinationClick = (name: string) => {
    navigate(`/search?name=${encodeURIComponent(name)}`);
  };

  return (
    <section className={`py-24 px-4 ${isChristmasTheme ? 'bg-gradient-to-b from-white to-red-50' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Khám phá những
            <span className={`block ${isChristmasTheme ? 'christmas-gradient-text' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'}`}>
              {isChristmasTheme ? 'kỳ nghỉ Giáng sinh!' : 'thiên đường nghỉ dưỡng'}
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isChristmasTheme ? 'text-green-800' : 'text-slate-500'}`}>
            {isChristmasTheme 
              ? 'Tận hưởng mùa lễ hội tại những điểm đến tuyệt vời với ưu đãi đặc biệt!'
              : 'Những địa điểm được yêu thích nhất với hàng trăm resort cao cấp đang chờ đón bạn'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <DestinationCard 
              key={dest.id} 
              name={dest.name} 
              image={dest.image} 
              resortCount={dest.resortCount} 
              onClick={() => handleDestinationClick(dest.name)}
              isChristmas={isChristmasTheme}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/search')} 
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 cursor-pointer group ${
              isChristmasTheme 
                ? 'bg-gradient-to-r from-red-600 to-green-700 text-white hover:shadow-lg christmas-glow'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Xem tất cả điểm đến
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default DestinationSection;

