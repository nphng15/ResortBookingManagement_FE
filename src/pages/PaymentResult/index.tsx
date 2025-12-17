import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { CheckCircle, XCircle, Loader2, Home, RotateCcw } from 'lucide-react';
import { queryZaloPayStatus, getAppTransId, clearAppTransId } from '../../services/zalopayService';

type PaymentStatus = 'loading' | 'success' | 'processing' | 'failed';

function PaymentResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    const checkPayment = async () => {
      const appTransId = searchParams.get('apptransid') || getAppTransId();
      const urlAmount = searchParams.get('amount');
      
      if (!appTransId) {
        setStatus('failed');
        setMessage('Không tìm thấy thông tin giao dịch');
        return;
      }
      
      if (urlAmount) {
        setAmount(parseInt(urlAmount, 10));
      }

      try {
        const result = await queryZaloPayStatus(appTransId);
        
        if (result.return_code === 1) {
          setStatus('success');
          setMessage('Thanh toán thành công!');
          setAmount(result.amount || null);
          clearAppTransId();
        } else if (result.return_code === 2) {
          setStatus('processing');
          setMessage('Đang xử lý thanh toán...');
          // Polling sau 3 giây
          setTimeout(checkPayment, 3000);
        } else {
          setStatus('failed');
          setMessage(result.return_message || 'Thanh toán thất bại');
          clearAppTransId();
        }
      } catch (error) {
        setStatus('failed');
        setMessage(error instanceof Error ? error.message : 'Có lỗi xảy ra');
      }
    };

    checkPayment();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-violet-600 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-slate-800 mb-2">Đang kiểm tra thanh toán</h1>
            <p className="text-slate-500">Vui lòng đợi trong giây lát...</p>
          </>
        )}

        {status === 'processing' && (
          <>
            <Loader2 className="w-16 h-16 text-amber-500 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-slate-800 mb-2">Đang xử lý</h1>
            <p className="text-slate-500">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-slate-800 mb-2">{message}</h1>
            {amount && (
              <p className="text-2xl font-bold text-green-600 mb-4">{formatCurrency(amount)}</p>
            )}
            <p className="text-slate-500 mb-6">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Về trang chủ
            </button>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-slate-800 mb-2">Thanh toán thất bại</h1>
            <p className="text-slate-500 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/cart')}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Thử lại
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Về trang chủ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentResult;
