import { useState } from 'react';
import { CreditCard, Shield, Clock } from 'lucide-react';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => Promise<void>;
}

function CartSummary({ totalItems, totalPrice, onCheckout }: CartSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await onCheckout();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 className="font-semibold text-lg text-white">Chi tiết đơn hàng</h2>
      </div>

      <div className="p-6">
        {/* Order Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-slate-600">
            <span>Số phòng đặt</span>
            <span className="font-medium text-slate-800">{totalItems} phòng</span>
          </div>
          <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-end">
            <span className="text-slate-600">Tổng cộng</span>
            <div className="text-right">
              <span className="font-bold text-2xl text-blue-600">
                {totalPrice.toLocaleString('vi-VN')}
              </span>
              <span className="text-blue-600 font-medium ml-1">đ</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={totalItems === 0 || isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-blue-500/25 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Đang xử lý...
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Tiến hành thanh toán
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-green-600" />
            </div>
            <span>Thanh toán an toàn & bảo mật</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-amber-600" />
            </div>
            <span>Xác nhận đặt phòng ngay lập tức</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
