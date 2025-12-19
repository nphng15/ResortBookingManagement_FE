import { useState, useEffect, useCallback } from 'react';
import { CalendarDaysIcon, TableCellsIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { DateRangePicker, BookingCalendar, Modal } from '../components';
import { getPartnerBookingSchedule, getPartnerResorts, getCurrentWeekRange, type BookingSchedule, type PartnerResort } from '../../../services/partnerService';

const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('vi-VN');
};

const formatDateForInput = (date: Date) => {
  return date.toISOString().split('T')[0];
};

type ViewMode = 'calendar' | 'list';

export default function BookingManagement() {
  const [bookings, setBookings] = useState<BookingSchedule[]>([]);
  const [resorts, setResorts] = useState<PartnerResort[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<BookingSchedule | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedResortId, setSelectedResortId] = useState<number | undefined>(undefined);

  const weekRange = getCurrentWeekRange();
  const [startDate, setStartDate] = useState(formatDateForInput(weekRange.start));
  const [endDate, setEndDate] = useState(formatDateForInput(weekRange.end));

  useEffect(() => {
    const loadResorts = async () => {
      try {
        const data = await getPartnerResorts();
        setResorts(data);
      } catch (err) {
        console.error('Failed to fetch resorts:', err);
      }
    };
    loadResorts();
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPartnerBookingSchedule({
        start: startDate,
        end: endDate,
        resort_id: selectedResortId,
      });
      setBookings(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Không thể tải dữ liệu';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, selectedResortId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBookingClick = (booking: BookingSchedule) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = direction === 'next' ? 7 : -7;
    start.setDate(start.getDate() + days);
    end.setDate(end.getDate() + days);
    setStartDate(formatDateForInput(start));
    setEndDate(formatDateForInput(end));
  };

  const handleResortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedResortId(value ? Number(value) : undefined);
  };


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đặt phòng</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'calendar' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <CalendarDaysIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <TableCellsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateWeek('prev')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <DateRangePicker startDate={startDate} endDate={endDate} onStartChange={setStartDate} onEndChange={setEndDate} />
          <button onClick={() => navigateWeek('next')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedResortId ?? ''}
            onChange={handleResortChange}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Tất cả resort</option>
            {resorts.map((resort) => (
              <option key={resort.id} value={resort.id}>{resort.name}</option>
            ))}
          </select>
          <button onClick={loadData} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer">
            Tải lại
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : viewMode === 'calendar' ? (
        <BookingCalendar bookings={bookings} startDate={new Date(startDate)} endDate={new Date(endDate)} onBookingClick={handleBookingClick} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phòng</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Loại phòng</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Resort</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Check-out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking, i) => (
                <tr key={`${booking.room_id}-${i}`} onClick={() => handleBookingClick(booking)} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.room_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.room_type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.resort_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDateTime(booking.started_time)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDateTime(booking.finished_time)}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Không có đặt phòng trong khoảng thời gian này</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Chi tiết đặt phòng">
        {selectedBooking && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Số phòng</p><p className="font-medium">{selectedBooking.room_number}</p></div>
              <div><p className="text-sm text-gray-500">Loại phòng</p><p className="font-medium">{selectedBooking.room_type}</p></div>
              <div><p className="text-sm text-gray-500">Resort</p><p className="font-medium">{selectedBooking.resort_name}</p></div>
              <div><p className="text-sm text-gray-500">ID phòng</p><p className="font-medium">#{selectedBooking.room_id}</p></div>
              <div><p className="text-sm text-gray-500">Check-in</p><p className="font-medium">{formatDateTime(selectedBooking.started_time)}</p></div>
              <div><p className="text-sm text-gray-500">Check-out</p><p className="font-medium">{formatDateTime(selectedBooking.finished_time)}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
