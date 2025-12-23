import { getToken } from './authService';
import { API_BASE_URL } from '../config/api';

// Response /api/v1/partner/statistics
export interface PartnerStatistics {
  new_bookings_today: number;
  monthly_revenue: number;
  total_bookings: number;
  current_balance: number;
  balance_movements: {
    revenues: RevenueItem[];
    withdrawals: WithdrawalItem[];
  };
}

// Khoản thu từ booking
export interface RevenueItem {
  invoice_id: number;
  booking_detail_id: number;
  amount: number;
  time: string;
  type: 'REVENUE';
}

// Lịch sử rút tiền
export interface WithdrawalItem {
  id: number;
  amount: number;
  time: string;
  type: 'WITHDRAW';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// Response /api/v1/partner/withdraw
export interface WithdrawResponse {
  message: string;
  withdraw_id: number;
  partner_id: number;
  requested_amount: number;
  remaining_balance: number;
  status: string;
  created_at: string;
}

// Lịch đặt phòng
export interface BookingSchedule {
  room_id: number;
  resort_name: string;
  room_type: string;
  room_number: string;
  started_time: string;
  finished_time: string;
}

export interface BookingFilters {
  start?: string;
  end?: string;
  resort_id?: number;
}

// Resort của partner
export interface PartnerResort {
  id: number;
  name: string;
}

// Lấy khoảng thời gian tuần hiện tại (Thứ 2 - Chủ nhật)
export const getCurrentWeekRange = (): { start: Date; end: Date } => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  const start = new Date(now);
  start.setDate(now.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// GET /api/v1/partner/statistics

export const getPartnerStatistics = async (): Promise<PartnerStatistics> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/partner/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Phiên đăng nhập hết hạn');
    }
    if (response.status === 403) {
      throw new Error('Tài khoản không phải là partner');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể tải thống kê');
  }

  return response.json();
};

// POST /api/v1/partner/withdraw?amount={amount}

export const requestWithdrawal = async (amount: number): Promise<WithdrawResponse> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/partner/withdraw?amount=${amount}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Phiên đăng nhập hết hạn');
    }
    if (response.status === 400) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Số dư không đủ để rút tiền');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Yêu cầu rút tiền thất bại');
  }

  return response.json();
};

// GET /api/v1/partner/bookings/schedule
export const getPartnerBookingSchedule = async (
  filters?: BookingFilters
): Promise<BookingSchedule[]> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const params = new URLSearchParams();
  if (filters?.start) params.append('start', filters.start);
  if (filters?.end) params.append('end', filters.end);
  if (filters?.resort_id) params.append('resort_id', filters.resort_id.toString());

  const queryString = params.toString();
  const url = `${API_BASE_URL}/partner/bookings/schedule${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Phiên đăng nhập hết hạn');
    }
    if (response.status === 403) {
      throw new Error('Tài khoản không phải là partner');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể lấy lịch đặt phòng');
  }

  return response.json();
};

// GET /api/v1/partner/resorts

export const getPartnerResorts = async (): Promise<PartnerResort[]> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const response = await fetch(`${API_BASE_URL}/partner/resorts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Phiên đăng nhập hết hạn');
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể lấy danh sách resort');
  }

  return response.json();
};
