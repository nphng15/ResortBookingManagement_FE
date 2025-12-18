import {
  getPartnerBookingSchedule,
  getCurrentWeekRange,
  type BookingSchedule,
  type BookingFilters,
} from '../../../services/partnerBookingService';

export async function fetchBookingSchedule(
  partnerId: number,
  filters?: BookingFilters
): Promise<BookingSchedule[]> {
  return getPartnerBookingSchedule(partnerId, filters);
}

export { getCurrentWeekRange };
export type { BookingSchedule, BookingFilters };
