import { getToken } from './authService';

const API_BASE_URL = '/api/v1/zalopay';

// Request tạo đơn thanh toán
export interface CreatePaymentRequest {
  booking_id: number;
  redirect_url?: string;
}

// Response tạo đơn thanh toán
export interface CreatePaymentResponse {
  return_code: number;
  return_message: string;
  order_url?: string;
  app_trans_id?: string;
  zp_trans_token?: string;
}

// Request query trạng thái
export interface QueryPaymentRequest {
  app_trans_id: string;
}

// Response query trạng thái
export interface QueryPaymentResponse {
  return_code: number; // 1 = thành công, 2 = đang xử lý, 3 = thất bại
  return_message: string;
  is_processing: boolean;
  amount?: number;
  zp_trans_id?: number;
}

// Tạo đơn thanh toán ZaloPay
export const createZaloPayOrder = async (data: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập để thanh toán');

  const response = await fetch(`${API_BASE_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tạo đơn thanh toán');
  }

  return response.json();
};

// Query trạng thái thanh toán
export const queryZaloPayStatus = async (appTransId: string): Promise<QueryPaymentResponse> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập');

  const response = await fetch(`${API_BASE_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ app_trans_id: appTransId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể kiểm tra trạng thái thanh toán');
  }

  return response.json();
};

// Lưu app_trans_id vào localStorage
export const saveAppTransId = (appTransId: string) => {
  localStorage.setItem('zalopay_app_trans_id', appTransId);
};

// Lấy app_trans_id từ localStorage
export const getAppTransId = (): string | null => {
  return localStorage.getItem('zalopay_app_trans_id');
};

// Xóa app_trans_id khỏi localStorage
export const clearAppTransId = () => {
  localStorage.removeItem('zalopay_app_trans_id');
};
