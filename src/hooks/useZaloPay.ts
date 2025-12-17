import { useState, useCallback } from 'react';
import {
  createZaloPayOrder,
  queryZaloPayStatus,
  saveAppTransId,
  clearAppTransId,
} from '../services/zalopayService';

export type PaymentStatus = 'idle' | 'creating' | 'processing' | 'success' | 'failed';

export function useZaloPay() {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  // Tạo đơn thanh toán và trả về URL redirect
  const createPayment = useCallback(async (bookingId: number): Promise<string | null> => {
    setStatus('creating');
    setError(null);

    try {
      const redirectUrl = `${window.location.origin}/payment-result`;

      const result = await createZaloPayOrder({
        booking_id: bookingId,
        redirect_url: redirectUrl,
      });

      if (result.return_code === 1 && result.order_url && result.app_trans_id) {
        saveAppTransId(result.app_trans_id);
        return result.order_url;
      } else {
        setStatus('failed');
        setError(result.return_message || 'Không thể tạo đơn thanh toán');
        return null;
      }
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Lỗi tạo đơn thanh toán');
      return null;
    }
  }, []);

  // Kiểm tra trạng thái thanh toán
  const checkPaymentStatus = useCallback(async (appTransId: string) => {
    setStatus('processing');

    try {
      const result = await queryZaloPayStatus(appTransId);

      if (result.return_code === 1) {
        setStatus('success');
        clearAppTransId();
        return { success: true, amount: result.amount };
      } else if (result.return_code === 2) {
        // Đang xử lý
        return { success: false, processing: true };
      } else {
        setStatus('failed');
        setError(result.return_message || 'Thanh toán thất bại');
        clearAppTransId();
        return { success: false, processing: false };
      }
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Lỗi kiểm tra thanh toán');
      return { success: false, processing: false };
    }
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return {
    status,
    error,
    createPayment,
    checkPaymentStatus,
    reset,
  };
}
