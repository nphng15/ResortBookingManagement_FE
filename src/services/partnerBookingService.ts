import { getToken } from './authService';

const API_BASE_URL = '/api/v1';

// Types
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

// Helper: Lấy khoảng thời gian tuần hiện tại (Thứ 2 - Chủ nhật)
export const getCurrentWeekRange = (): { start: Date; end: Date } => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  // Tính ngày thứ 2 (Monday = 1)
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  const start = new Date(now);
  start.setDate(now.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Chủ nhật
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

/**
 * Lấy lịch đặt phòng của partner
 * GET /api/v1/partner/bookings/schedule
 * 
 * Query params:
 * - start: datetime (YYYY-MM-DD), mặc định Thứ 2 tuần này
 * - end: datetime (YYYY-MM-DD), mặc định Chủ nhật tuần này
 * - resort_id: int (optional)
 */
export const getPartnerBookingSchedule = async (
  filters?: BookingFilters
): Promise<BookingSchedule[]> => {
  const token = getToken();
  if (!token) throw new Error('Chưa đăng nhập');

  const params = new URLSearchParams();

  if (filters?.start) {
    params.append('start', filters.start);
  }
  if (filters?.end) {
    params.append('end', filters.end);
  }
  if (filters?.resort_id) {
    params.append('resort_id', filters.resort_id.toString());
  }

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

// Resort của partner
export interface PartnerResort {
  id: number;
  name: string;
}

/**
 * Lấy danh sách resort của partner
 * GET /api/v1/partner/resorts
 */
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
