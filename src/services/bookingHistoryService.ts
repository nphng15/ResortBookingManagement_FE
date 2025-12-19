import { getToken } from './authService';
import { API_BASE_URL } from '../config/api';

export type BookingStatus = 'PAID' | 'CANCELLED';

export type BookingHistory = {
  id: number;
  booking_id: number;
  cost: number;
  number_of_rooms: number;
  started_at: string;
  finished_at: string;
  status: BookingStatus;
  room_type_name: string;
  room_type_id: number;
  resort_name: string;
  resort_id: number;
};

export type BookingHistoryResponse = {
  items: BookingHistory[];
  total: number;
};

// Lấy lịch sử booking của customer
export const getBookingHistories = async (customerId: number): Promise<BookingHistory[]> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập');

  const response = await fetch(`${API_BASE_URL}/customer/${customerId}/histories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể lấy lịch sử booking');
  }

  return response.json();
};

// Helper: Kiểm tra booking có phải upcoming không (started_at > ngày hiện tại)
export const isUpcoming = (startedAt: string): boolean => {
  const startDate = new Date(startedAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return startDate > today;
};

// Helper: Format status sang tiếng Việt
export const getStatusLabel = (status: BookingStatus | 'UPCOMING'): string => {
  const labels: Record<BookingStatus | 'UPCOMING', string> = {
    PAID: 'Đã thanh toán',
    CANCELLED: 'Đã hủy',
    UPCOMING: 'Sắp tới',
  };
  return labels[status] || status;
};

// Helper: Lấy màu cho status
export const getStatusColor = (status: BookingStatus | 'UPCOMING'): string => {
  const colors: Record<BookingStatus | 'UPCOMING', string> = {
    PAID: 'green',
    CANCELLED: 'red',
    UPCOMING: 'blue',
  };
  return colors[status] || 'gray';
};

// Hủy booking
export const cancelBooking = async (bookingDetailId: number): Promise<void> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập');

  const response = await fetch(`${API_BASE_URL}/booking-detail/${bookingDetailId}/cancel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể hủy booking');
  }
};
