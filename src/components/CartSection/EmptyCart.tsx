import { ShoppingCart, Search } from 'lucide-react';
import { useNavigate } from 'react-router';

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-8">
        <ShoppingCart size={48} className="text-slate-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Giỏ hàng trống</h2>
      <p className="text-slate-500 mb-8 text-center max-w-md">
        Bạn chưa chọn phòng nào. Hãy khám phá các resort tuyệt vời và chọn phòng phù hợp với nhu cầu của bạn.
      </p>
      <button
        onClick={() => navigate('/search')}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
      >
        <Search size={20} />
        Tìm kiếm phòng
      </button>
    </div>
  );
}

export default EmptyCart;
