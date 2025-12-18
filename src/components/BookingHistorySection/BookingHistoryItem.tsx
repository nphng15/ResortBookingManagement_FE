import { useState } from 'react';
import { type BookingHistory, getStatusLabel, cancelBooking } from '../../services/bookingHistoryService';

interface BookingHistoryItemProps {
  booking: BookingHistory;
  isUpcoming?: boolean;
  onCancelled?: () => void;
}

const statusStyles = {
  UPCOMING: {
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    accent: 'from-blue-500 to-indigo-500',
  },
  PAID: {
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accent: 'from-emerald-500 to-teal-500',
  },
  CANCELLED: {
    badge: 'bg-red-100 text-red-700 border-red-200',
    accent: 'from-red-500 to-rose-500',
  },
};

function BookingHistoryItem({ booking, isUpcoming = false, onCancelled }: BookingHistoryItemProps) {
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleCancel = async () => {
    if (!confirm('Bạn có chắc muốn hủy booking này?')) return;
    
    setCancelling(true);
    setError(null);
    
    try {
      await cancelBooking(booking.id);
      onCancelled?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setCancelling(false);
    }
  };

  const displayStatus = isUpcoming ? 'UPCOMING' : booking.status;
  const style = statusStyles[displayStatus];

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer">
      {/* Accent bar */}
      <div className={`h-1 bg-gradient-to-r ${style.accent}`} />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-slate-800">#{booking.booking_id}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.badge}`}>
                {getStatusLabel(displayStatus)}
              </span>
            </div>
            <h3 className="font-medium text-slate-900 truncate">{booking.resort_name}</h3>
            <p className="text-sm text-slate-500">{booking.room_type_name}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {formatCurrency(booking.cost)}
            </div>
            <div className="text-xs text-slate-400">{booking.number_of_rooms} phòng</div>
          </div>
        </div>

        {/* Date info */}
        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="text-slate-500">Nhận phòng</span>
            </div>
            <div className="font-medium text-slate-800 mt-0.5">{formatDate(booking.started_at)}</div>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-slate-500">Trả phòng</span>
            </div>
            <div className="font-medium text-slate-800 mt-0.5">{formatDate(booking.finished_at)}</div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Cancel button */}
        {isUpcoming && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            >
              {cancelling ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang hủy...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hủy đặt phòng
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistoryItem;
