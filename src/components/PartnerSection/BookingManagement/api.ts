import type { BookingSchedule, BookingFilters } from './types';

// Helper to get current week range
const getCurrentWeekRange = () => {
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

// Mock data
const mockBookings: BookingSchedule[] = [
  { room_id: 1, resort_name: 'Resort ABC', room_type: 'Deluxe Room', room_number: '101', started_time: '2025-12-08T14:00:00', finished_time: '2025-12-10T12:00:00' },
  { room_id: 2, resort_name: 'Resort ABC', room_type: 'Suite', room_number: '201', started_time: '2025-12-09T14:00:00', finished_time: '2025-12-12T12:00:00' },
  { room_id: 3, resort_name: 'Resort ABC', room_type: 'Standard Room', room_number: '102', started_time: '2025-12-08T14:00:00', finished_time: '2025-12-09T12:00:00' },
  { room_id: 1, resort_name: 'Resort ABC', room_type: 'Deluxe Room', room_number: '101', started_time: '2025-12-11T14:00:00', finished_time: '2025-12-14T12:00:00' },
  { room_id: 4, resort_name: 'Resort ABC', room_type: 'Family Room', room_number: '301', started_time: '2025-12-10T14:00:00', finished_time: '2025-12-13T12:00:00' },
  { room_id: 5, resort_name: 'Resort ABC', room_type: 'Ocean View', room_number: '401', started_time: '2025-12-09T14:00:00', finished_time: '2025-12-11T12:00:00' },
];

/**
 * Fetch booking schedule from API
 * TODO: Replace mock implementation with actual API call
 * 
 * Example API call:
 * const params = new URLSearchParams();
 * if (filters.start) params.append('start', filters.start);
 * if (filters.end) params.append('end', filters.end);
 * if (filters.resortId) params.append('ResortId', filters.resortId.toString());
 * const response = await fetch(`/api/v1/partner/${partnerId}/bookings/schedule?${params}`);
 * return response.json();
 */
export async function fetchBookingSchedule(partnerId: number, filters?: BookingFilters): Promise<BookingSchedule[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const { start, end } = filters?.start && filters?.end 
    ? { start: new Date(filters.start), end: new Date(filters.end) }
    : getCurrentWeekRange();
  
  // Filter bookings within date range
  return mockBookings.filter((b) => {
    const bookingStart = new Date(b.started_time);
    const bookingEnd = new Date(b.finished_time);
    return bookingStart <= end && bookingEnd >= start;
  });
}

export { getCurrentWeekRange };
