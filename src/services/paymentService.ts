import { getToken } from './authService';

const API_BASE_URL = '/api/v1';

export interface PaymentRequest {
  customer_id: number;
  id: number;
  cost: number;
  payment_method: 'CARD' | 'CASH' | 'TRANSFER';
  partner_id: number;
  booking_detail_id: number;
  finished_time: string | null;
}

export interface PaymentResponse {
  message: string;
  payment_id?: number;
  status?: string;
}

// Tạo hóa đơn và cập nhật trạng thái booking_detail
export const createPayment = async (data: PaymentRequest): Promise<PaymentResponse> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập để thanh toán');

  const response = await fetch(`${API_BASE_URL}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Thanh toán thất bại');
  }

  return response.json();
};
