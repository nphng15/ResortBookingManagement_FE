import { useEffect, useRef, useState } from "react";

type SelectionMode = 'start' | 'end';

interface DateProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  setSelectedStartDate: (value: Date | null) => void;
  setSelectedEndDate: (value: Date | null) => void;
}

export default function DateRangePicker({
  selectedStartDate, selectedEndDate, setSelectedStartDate, setSelectedEndDate
}: DateProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('start');
  const [activeInput, setActiveInput] = useState<SelectionMode | null>(null);
  const datepickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveInput(null);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return 'Chọn ngày';
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return `${days[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getNights = () => {
    if (!selectedStartDate || !selectedEndDate) return null;
    return Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleDayClick = (selectedDay: Date) => {
    if (selectionMode === 'start') {
      setSelectedStartDate(selectedDay);
      setSelectedEndDate(null);
      setSelectionMode('end');
      setActiveInput('end');
    } else {
      if (selectedStartDate && selectedDay < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(selectedDay);
      } else {
        if (selectedStartDate?.toDateString() === selectedDay.toDateString()) return;
        setSelectedEndDate(selectedDay);
      }
      setSelectionMode('start');
      setIsOpen(false);
      setActiveInput(null);
    }
  };

  const renderCalendar = (monthOffset: number) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];
    const today = new Date(); today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const isToday = day.toDateString() === today.toDateString();
      const isPast = day < today;
      const isStartDate = selectedStartDate && day.toDateString() === selectedStartDate.toDateString();
      const isEndDate = selectedEndDate && day.toDateString() === selectedEndDate.toDateString();
      const isInRange = selectedStartDate && selectedEndDate && day > selectedStartDate && day < selectedEndDate;

      daysArray.push(
        <button
          key={i}
          onClick={() => !isPast && handleDayClick(day)}
          disabled={isPast}
          className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all cursor-pointer
            ${isPast ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-violet-100'}
            ${isStartDate || isEndDate ? 'bg-violet-600 text-white hover:bg-violet-700' : ''}
            ${isInRange ? 'bg-violet-100 text-violet-700' : ''}
            ${isToday && !isStartDate && !isEndDate ? 'text-violet-600 font-bold ring-2 ring-violet-200' : ''}
            ${!isPast && !isStartDate && !isEndDate && !isInRange && !isToday ? 'text-slate-700' : ''}
          `}
        >
          {i}
        </button>
      );
    }
    return daysArray;
  };

  const getMonthName = (monthOffset: number) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    return `${months[displayMonth.getMonth()]} ${displayMonth.getFullYear()}`;
  };

  return (
    <div className="relative" ref={datepickerRef}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Check-in */}
        <div
          onClick={() => { setIsOpen(true); setActiveInput('start'); setSelectionMode('start'); }}
          className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            activeInput === 'start' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 bg-slate-50 hover:border-violet-400'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-slate-500">Nhận phòng</span>
          </div>
          <p className={`text-lg font-semibold ${selectedStartDate ? 'text-slate-900' : 'text-slate-400'}`}>
            {formatDisplayDate(selectedStartDate)}
          </p>
        </div>

        {/* Nights indicator */}
        {getNights() && (
          <div className="hidden sm:flex items-center justify-center px-4">
            <div className="text-center">
              <p className="text-sm font-bold text-violet-600">{getNights()} đêm</p>
              <div className="w-8 h-0.5 bg-slate-300 mt-1" />
            </div>
          </div>
        )}

        {/* Check-out */}
        <div
          onClick={() => { setIsOpen(true); setActiveInput('end'); setSelectionMode('end'); }}
          className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            activeInput === 'end' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 bg-slate-50 hover:border-violet-400'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-slate-500">Trả phòng</span>
          </div>
          <p className={`text-lg font-semibold ${selectedEndDate ? 'text-slate-900' : 'text-slate-400'}`}>
            {formatDisplayDate(selectedEndDate)}
          </p>
        </div>
      </div>

      {/* Calendar Popup */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {[0, 1].map((monthOffset) => (
              <div key={monthOffset} className="flex-1">
                {/* Month Header */}
                <div className="flex items-center justify-between mb-4">
                  {monthOffset === 0 && (
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  {monthOffset === 0 && <div className="w-8" />}
                  
                  <h3 className="text-lg font-bold text-slate-900">{getMonthName(monthOffset)}</h3>
                  
                  {monthOffset === 1 && <div className="w-8" />}
                  {monthOffset === 1 && (
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
                    <div key={day} className="w-10 h-8 flex items-center justify-center text-xs font-semibold text-slate-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar(monthOffset)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
