import {
  getPartnerBookingSchedule,
  getPartnerResorts,
  getCurrentWeekRange,
  type BookingSchedule,
  type BookingFilters,
  type PartnerResort,
} from '../../../services/partnerBookingService';

export async function fetchBookingSchedule(filters?: BookingFilters): Promise<BookingSchedule[]> {
  return getPartnerBookingSchedule(filters);
}

export async function fetchPartnerResorts(): Promise<PartnerResort[]> {
  return getPartnerResorts();
}

export { getCurrentWeekRange };
export type { BookingSchedule, BookingFilters, PartnerResort };
