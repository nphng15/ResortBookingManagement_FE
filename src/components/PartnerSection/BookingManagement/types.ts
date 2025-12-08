export interface BookingSchedule {
  room_id: number;
  resort_name: string;
  room_type: string;
  room_number: string;
  started_time: string;
  finished_time: string;
}

export interface BookingFilters {
  start: string;
  end: string;
  resortId?: number;
}
