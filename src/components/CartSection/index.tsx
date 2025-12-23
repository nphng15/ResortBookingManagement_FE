import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import CartList from './CartList';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';
import Toast from './Toast';
import { useCart } from '../../hooks/useCart';
import { useZaloPay } from '../../hooks/useZaloPay';

function CartSection() {
  const navigate = useNavigate();
  const {
    items,
    cartId,
    loading,
    updating,
    totalPrice,
    totalItems,
    toast,
    showToast,
    closeToast,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();
  
  const { createPayment } = useZaloPay();

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Giỏ hàng của bạn</h1>
            <p className="text-slate-500 text-sm mt-0.5">Xem lại các phòng đã chọn trước khi thanh toán</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartList
              items={items}
              updatingItemId={updating}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              onCheckout={async () => {
                if (!cartId) {
                  showToast('Không tìm thấy giỏ hàng', 'error');
                  return;
                }
                const orderUrl = await createPayment(cartId);
                if (orderUrl) {
                  window.location.href = orderUrl;
                }
              }}
            />
          </div>
        </div>
      </div>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}

export default CartSection;
