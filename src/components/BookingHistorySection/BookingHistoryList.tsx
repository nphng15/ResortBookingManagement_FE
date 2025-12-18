import { type BookingHistory, getStatusLabel, isUpcoming } from '../../services/bookingHistoryService';
import BookingHistoryItem from './BookingHistoryItem';

interface BookingHistoryListProps {
  histories: BookingHistory[];
  onRefresh?: () => void;
}

const sectionStyles = {
  UPCOMING: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    border: 'border-blue-100',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  PAID: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  CANCELLED: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-red-500 to-rose-500',
    bg: 'bg-gradient-to-r from-red-50 to-rose-50',
    border: 'border-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
};

function BookingHistoryList({ histories, onRefresh }: BookingHistoryListProps) {
  const upcomingBookings = histories.filter(h => h.status === 'PAID' && isUpcoming(h.started_at));
  const paidBookings = histories.filter(h => h.status === 'PAID' && !isUpcoming(h.started_at));
  const cancelledBookings = histories.filter(h => h.status === 'CANCELLED');

  const renderSection = (
    bookings: BookingHistory[],
    type: 'UPCOMING' | 'PAID' | 'CANCELLED',
    showCancel = false
  ) => {
    if (bookings.length === 0) return null;
    const style = sectionStyles[type];

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className={`${style.bg} ${style.border} border-b px-5 py-4`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white shadow-lg`}>
              {style.icon}
            </div>
            <div>
              <h2 className={`font-semibold ${style.text}`}>
                {getStatusLabel(type)}
              </h2>
              <p className="text-sm text-slate-500">{bookings.length} đặt phòng</p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {bookings.map(booking => (
            <BookingHistoryItem 
              key={booking.id} 
              booking={booking} 
              isUpcoming={showCancel}
              onCancelled={onRefresh} 
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderSection(upcomingBookings, 'UPCOMING', true)}
      {renderSection(paidBookings, 'PAID')}
      {renderSection(cancelledBookings, 'CANCELLED')}
    </div>
  );
}

export default BookingHistoryList;
