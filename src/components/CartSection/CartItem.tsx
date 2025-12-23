import { Minus, Plus, Trash2, Calendar, Maximize2, Home, Loader2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
  isUpdating?: boolean;
  onIncrease: (itemId: number) => void;
  onDecrease: (itemId: number) => void;
  onRemove: (bookingDetailId: number) => void;
}

// Format date để hiển thị
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

function CartItem({ item, isUpdating, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const isOverBooked = item.availableRooms !== undefined && item.quantity > item.availableRooms;
  const canIncrease = item.availableRooms === undefined || item.quantity < item.availableRooms;
  
  return (
    <div className={`group bg-white rounded-2xl border p-5 hover:shadow-lg transition-all duration-300 ${
      isOverBooked ? 'border-red-300 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
    } ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}>
      <div className="flex gap-5">
        {/* Room Image */}
        <div className="w-36 h-28 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex-shrink-0 relative">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Maximize2 size={24} className="text-slate-400 mx-auto mb-1" />
              <span className="text-xs text-slate-400">No image</span>
            </div>
          </div>
        </div>

        {/* Room Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">{item.roomName}</h3>
              <p className="text-sm text-blue-600 font-medium">{item.resortName}</p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-3 mt-3 text-sm text-slate-600 flex-wrap">
            <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
              <Calendar size={14} className="text-slate-400" />
              {formatDate(item.startedAt)} - {formatDate(item.finishedAt)}
            </span>
            {item.availableRooms !== undefined && (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium ${
                item.availableRooms > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                <Home size={14} />
                {item.availableRooms > 0 ? `Còn ${item.availableRooms} phòng` : 'Hết phòng'}
              </span>
            )}
          </div>
          
          {isOverBooked && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              ⚠️ Số phòng đặt vượt quá số phòng khả dụng
            </p>
          )}
        </div>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-50 rounded-xl p-1">
            <button
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity <= 1 || isUpdating}
              className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none cursor-pointer"
            >
              <Minus size={18} className="text-slate-600" />
            </button>
            <span className="w-12 text-center font-bold text-lg text-slate-800">
              {isUpdating ? (
                <Loader2 size={18} className="animate-spin mx-auto text-blue-500" />
              ) : (
                item.quantity
              )}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              disabled={!canIncrease || isUpdating}
              className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none cursor-pointer"
            >
              <Plus size={18} className="text-slate-600" />
            </button>
          </div>
          
          <span className="text-sm text-slate-500">
            {item.quantity} phòng
          </span>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500 mb-0.5">
            {item.price.toLocaleString('vi-VN')}đ × {item.quantity} phòng
          </p>
          <p className="font-bold text-xl text-slate-800">
            {item.cost.toLocaleString('vi-VN')}đ
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
