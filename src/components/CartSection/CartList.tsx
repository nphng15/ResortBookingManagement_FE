import CartItem from './CartItem';
import type { CartItem as CartItemType } from '../../hooks/useCart';

interface CartListProps {
  items: CartItemType[];
  updatingItemId?: number | null;
  onIncrease: (itemId: number) => void;
  onDecrease: (itemId: number) => void;
  onRemove: (bookingDetailId: number) => void;
}

function CartList({ items, updatingItemId, onIncrease, onDecrease, onRemove }: CartListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-slate-800">
          Phòng đã chọn
        </h2>
        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {items.length} loại phòng
        </span>
      </div>
      
      <div className="space-y-4">
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            isUpdating={updatingItemId === item.id}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default CartList;
