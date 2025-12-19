import { type BookingSchedule } from '../../../services/partnerService';

interface BookingCalendarProps {
  bookings: BookingSchedule[];
  startDate: Date;
  endDate: Date;
  onBookingClick?: (booking: BookingSchedule) => void;
}

const formatTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric' });
};

const getDaysBetween = (start: Date, end: Date): Date[] => {
  const days: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
};

const getBookingsForDay = (bookings: BookingSchedule[], day: Date): BookingSchedule[] => {
  return bookings.filter((b) => {
    const bookingStart = new Date(b.started_time);
    const bookingEnd = new Date(b.finished_time);
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    return bookingStart <= dayEnd && bookingEnd >= dayStart;
  });
};

const roomColors = [
  'bg-blue-100 border-blue-300 text-blue-800',
  'bg-emerald-100 border-emerald-300 text-emerald-800',
  'bg-purple-100 border-purple-300 text-purple-800',
  'bg-orange-100 border-orange-300 text-orange-800',
  'bg-pink-100 border-pink-300 text-pink-800',
];

export default function BookingCalendar({ bookings, startDate, endDate, onBookingClick }: BookingCalendarProps) {
  const days = getDaysBetween(startDate, endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {days.slice(0, 7).map((day, i) => {
              const isToday = day.toDateString() === today.toDateString();
              return (
                <div key={i} className={`px-4 py-3 text-center border-r border-gray-100 last:border-r-0 ${isToday ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                  <p className={`text-sm font-medium ${isToday ? 'text-emerald-600' : 'text-gray-900'}`}>{formatDate(day)}</p>
                </div>
              );
            })}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 min-h-[400px]">
            {days.slice(0, 7).map((day, i) => {
              const dayBookings = getBookingsForDay(bookings, day);
              const isToday = day.toDateString() === today.toDateString();
              return (
                <div key={i} className={`border-r border-gray-100 last:border-r-0 p-2 ${isToday ? 'bg-emerald-50/30' : ''}`}>
                  <div className="space-y-2">
                    {dayBookings.map((booking, j) => (
                      <div
                        key={booking.room_id + '-' + j}
                        onClick={() => onBookingClick?.(booking)}
                        className={`p-2 rounded-lg border text-xs cursor-pointer hover:shadow-md transition-shadow ${roomColors[booking.room_id % roomColors.length]}`}
                      >
                        <p className="font-medium truncate">{booking.room_type}</p>
                        <p className="truncate opacity-75">Phòng {booking.room_number}</p>
                        <p className="mt-1 opacity-75">{formatTime(booking.started_time)} - {formatTime(booking.finished_time)}</p>
                      </div>
                    ))}
                    {dayBookings.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">Không có đặt phòng</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
