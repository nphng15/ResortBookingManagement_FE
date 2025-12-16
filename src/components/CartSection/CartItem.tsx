import { Minus, Plus, Trash2, Users, Bed, Maximize2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (roomId: number) => void;
  onDecrease: (roomId: number) => void;
  onRemove: (roomId: number) => void;
}

function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div className="flex gap-5">
        {/* Room Image */}
        <div className="w-36 h-28 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex-shrink-0 relative">
          {item.image ? (
            <img src={item.image} alt={item.roomName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Maximize2 size={24} className="text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-400">No image</span>
              </div>
            </div>
          )}
        </div>

        {/* Room Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">{item.roomName}</h3>
              <p className="text-sm text-blue-600 font-medium">{item.resortName}</p>
            </div>
            <button
              onClick={() => onRemove(item.roomId)}
              className="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
            <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
              <Maximize2 size={14} className="text-slate-400" />
              {item.area}m²
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
              <Bed size={14} className="text-slate-400" />
              {item.bedAmount} giường
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
              <Users size={14} className="text-slate-400" />
              {item.peopleAmount} người
            </span>
          </div>
        </div>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-50 rounded-xl p-1">
            <button
              onClick={() => onDecrease(item.roomId)}
              disabled={item.quantity <= 1}
              className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none cursor-pointer"
            >
              <Minus size={18} className="text-slate-600" />
            </button>
            <span className="w-12 text-center font-bold text-lg text-slate-800">{item.quantity}</span>
            <button
              onClick={() => onIncrease(item.roomId)}
              className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm flex items-center justify-center transition-all cursor-pointer"
            >
              <Plus size={18} className="text-slate-600" />
            </button>
          </div>
          
          <span className="text-sm text-slate-500">
            Còn <span className="font-medium text-slate-700">{item.maxAvailable}</span> phòng
          </span>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500 mb-0.5">
            {item.price.toLocaleString('vi-VN')}đ × {item.quantity}
          </p>
          <p className="font-bold text-xl text-slate-800">
            {itemTotal.toLocaleString('vi-VN')}đ
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
