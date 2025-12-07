import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SimpleDatePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onClose: () => void;
}

function SimpleDatePicker({ startDate, endDate, onStartDateChange, onEndDateChange, onClose }: SimpleDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
  };

  const handleDayClick = (day: Date) => {
    if (selectingStart) {
      onStartDateChange(day);
      setSelectingStart(false);
    } else {
      if (day < startDate) {
        onStartDateChange(day);
      } else {
        onEndDateChange(day);
        onClose();
      }
    }
  };

  const renderCalendar = (monthOffset: number) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const isPast = day < today;
      const isStart = startDate && day.toDateString() === startDate.toDateString();
      const isEnd = endDate && day.toDateString() === endDate.toDateString();
      const isInRange = startDate && endDate && day > startDate && day < endDate;

      days.push(
        <button
          key={i}
          disabled={isPast}
          onClick={() => !isPast && handleDayClick(day)}
          className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg transition
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100 cursor-pointer'}
            ${isStart || isEnd ? 'bg-blue-600 text-white font-semibold' : ''}
            ${isInRange ? 'bg-blue-100' : ''}
          `}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-6">
      <div className="flex gap-8">
        {[0, 1].map((offset) => (
          <div key={offset} className="flex-1">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-4">
              {offset === 0 && (
                <button onClick={goToPreviousMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft size={20} className="text-blue-600" />
                </button>
              )}
              {offset === 0 && <div className="w-6" />}
              
              <span className="font-semibold text-gray-800">
                {getMonthName(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1))}
              </span>
              
              {offset === 1 && <div className="w-6" />}
              {offset === 1 && (
                <button onClick={goToNextMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight size={20} className="text-blue-600" />
                </button>
              )}
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((d) => (
                <div key={d} className="w-10 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar(offset)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {selectingStart ? 'Chọn ngày nhận phòng' : 'Chọn ngày trả phòng'}
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Xong
        </button>
      </div>
    </div>
  );
}

export default SimpleDatePicker;
