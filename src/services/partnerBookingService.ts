import { getToken } from './authService';

const API_BASE_URL = '/api/v1';

// Types
export interface BookingSchedule {
  room_id: number;
  resort_name: string;
  room_type: string;
  room_number: number;
  started_time: string;
  finished_time: string;
}

export interface BookingFilters {
  start?: string;
  end?: string;
  resortId?: number;
}

// Helper: Lấy khoảng thời gian tuần hiện tại
export const getCurrentWeekRange = (): { start: Date; end: Date } => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// Helper: Format date cho API
export const formatDateForAPI = (date: Date): string => {
  return date.toISOString().replace('Z', '');
};

// Lấy lịch đặt phòng của partner
export const getPartnerBookingSchedule = async (
  partnerId: number,
  filters?: BookingFilters
): Promise<BookingSchedule[]> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập');

  const params = new URLSearchParams();

  if (filters?.start) {
    params.append('start', filters.start);
  }
  if (filters?.end) {
    params.append('end', filters.end);
  }
  if (filters?.resortId) {
    params.append('ResortId', filters.resortId.toString());
  }

  const queryString = params.toString();
  const url = `${API_BASE_URL}/partner/${partnerId}/bookings/schedule${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
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

// Lấy danh sách resort của partner
export const getPartnerResorts = async (partnerId: number): Promise<PartnerResort[]> => {
  const token = getToken();
  if (!token) throw new Error('Vui lòng đăng nhập');

  const response = await fetch(`${API_BASE_URL}/partner/${partnerId}/resorts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Không thể lấy danh sách resort');
  }

  return response.json();
};
