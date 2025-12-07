import { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from '@mui/material';
import { CalendarToday, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

type SelectionMode = 'start' | 'end';

interface DateProps{
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  setSelectedStartDate: (value: Date | null) => void;
  setSelectedEndDate: (value: Date | null) => void;
}

export default function DateRangePicker({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate
} : DateProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('start');
  const [activeInput, setActiveInput] = useState<SelectionMode | null>(null);

  const datepickerRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveInput(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return '';
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    return `${days[date.getDay()]}, ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const renderCalendar = (monthOffset: number) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<Box key={`empty-${i}`} sx={{ width: 40, height: 40 }}></Box>);
    }

    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const isToday = day.toDateString() === today.toDateString();
      const isPast = day < today;
      const isStartDate = selectedStartDate && day.toDateString() === selectedStartDate.toDateString();
      const isEndDate = selectedEndDate && day.toDateString() === selectedEndDate.toDateString();
      const isInRange = selectedStartDate && selectedEndDate && 
                        day > selectedStartDate && day < selectedEndDate;

      daysArray.push(
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isPast ? 'not-allowed' : 'pointer',
            width: 40,
            height: 40,
            borderRadius: (isStartDate || isEndDate) ? '8px' : '0',
            backgroundColor: (isStartDate || isEndDate) ? '#0064D2' : 
                           isInRange ? '#E3F2FD' : 
                           'transparent',
            color: (isStartDate || isEndDate) ? 'white' : 
                   isPast ? '#ccc' : 
                   isToday ? '#0064D2' : 
                   '#000',
            fontWeight: (isStartDate || isEndDate || isToday) ? 600 : 400,
            fontSize: '0.875rem',
            opacity: 1,
            position: 'relative',
            '&:hover': {
              backgroundColor: isPast ? 'transparent' : 
                             (isStartDate || isEndDate) ? '#0052A3' : 
                             '#F5F5F5'
            },
            '&::after': isToday && !isStartDate && !isEndDate ? {
              content: '""',
              position: 'absolute',
              bottom: 4,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#0064D2'
            } : {}
          }}
          onClick={() => !isPast && handleDayClick(day)}
        >
          {i}
        </Box>
      );
    }

    return daysArray;
  };

  const handleDayClick = (selectedDay: Date) => {
    if (selectionMode === 'start') {
      setSelectedStartDate(selectedDay);
      setSelectedEndDate(null);
      setSelectionMode('end');
      setActiveInput('end');
    } else {
      if (selectedStartDate && selectedDay < selectedStartDate) {
        // If end date is before start date, swap them
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(selectedDay);
      } else {
        if (selectedStartDate?.toDateString() === selectedDay.toDateString()){return;}
        setSelectedEndDate(selectedDay);
      }
      setSelectionMode('start');
        setIsOpen(false);
        setActiveInput(null);
    }
  };

  const handleStartDateClick = () => {
    setIsOpen(true);
    setActiveInput('start');
    setSelectionMode('start');
  };

  const handleEndDateClick = () => {
    setIsOpen(true);
    setActiveInput('end');
    setSelectionMode('end');
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getMonthName = (monthOffset: number) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                   'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    return `${months[displayMonth.getMonth()]} ${displayMonth.getFullYear()}`;
  };

  return (
    <Box sx={{ position: 'relative' }} ref={datepickerRef}>
      {/* Date Input Fields */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Check-in Date */}
        <Box 
          onClick={handleStartDateClick}
          sx={{
            flex: 1,
            p: 2,
            py: 2,
            border: 2,
            borderColor: activeInput === 'start' ? '#0064D2' : '#E0E0E0',
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: 'white',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: '#0064D2',
              boxShadow: '0 2px 8px rgba(0,100,210,0.1)'
            }
          }}
        >
          <Box sx={{ minHeight: '1.5rem',display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <CalendarToday sx={{ fontSize: 18, color: '#666' }} />
            <Typography sx={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>
              Ngày nhận phòng
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: selectedStartDate ? '#000' : '#999' }}>
            {selectedStartDate ? formatDisplayDate(selectedStartDate) : 'Chọn ngày'}
          </Typography>
        </Box>

        {/* Nights indicator */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          minWidth: 60,
          py: 2
        }}>
          <Typography sx={{ fontSize: '1rem', color: '#666', mb: 0.5 }}>
            {selectedStartDate && selectedEndDate ? 
              `${Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24))} đêm` 
              : ''}
          </Typography>
          <Box sx={{ 
            width: 40, 
            height: 2, 
            backgroundColor: '#E0E0E0',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: -3,
              top: -3,
              width: 8,
              height: 8,
              borderTop: '2px solid #E0E0E0',
              borderRight: '2px solid #E0E0E0',
              transform: 'rotate(45deg)'
            }
          }} />
        </Box>

        {/* Check-out Date */}
        <Box 
          onClick={handleEndDateClick}
          sx={{
            flex: 1,
            p: 2,
            border: 2,
            borderColor: activeInput === 'end' ? '#0064D2' : '#E0E0E0',
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: 'white',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: '#0064D2',
              boxShadow: '0 2px 8px rgba(0,100,210,0.1)'
            }
          }}
        >
          <Box sx={{ minHeight: '1.5rem', display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <CalendarToday sx={{ fontSize: 18, color: '#666' }} />
            <Typography sx={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>
              Ngày trả phòng
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: selectedEndDate ? '#000' : '#999' }}>
            {selectedEndDate ? formatDisplayDate(selectedEndDate) : 'Chọn ngày'}
          </Typography>
        </Box>
      </Box>

      {/* Calendar Popup */}
      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            mt: 1,
            backgroundColor: 'white',
            border: 1,
            borderColor: '#E0E0E0',
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 1000,
            p: 3
          }}
        >
          {/* Two months side by side */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            {[0, 1].map((monthOffset) => (
              <Box key={monthOffset} sx={{ flex: 1 }}>
                {/* Month Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  {monthOffset === 0 && (
                    <IconButton onClick={goToPreviousMonth} size="small" sx={{ color: '#0064D2' }}>
                      <KeyboardArrowLeft />
                    </IconButton>
                  )}
                  {monthOffset === 0 && <Box sx={{ width: 40 }} />}
                  
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#000' }}>
                    {getMonthName(monthOffset)}
                  </Typography>
                  
                  {monthOffset === 1 && <Box sx={{ width: 40 }} />}
                  {monthOffset === 1 && (
                    <IconButton onClick={goToNextMonth} size="small" sx={{ color: '#0064D2' }}>
                      <KeyboardArrowRight />
                    </IconButton>
                  )}

                </Box>

                {/* Days of week header */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1 }}>
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                    <Box key={day} sx={{ 
                      textAlign: 'center', 
                      py: 1, 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      color: '#666',
                      width: 40,
                      height: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {day}
                    </Box>
                  ))}
                </Box>

                {/* Calendar days */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
                  {renderCalendar(monthOffset)}
                </Box>
              </Box>
            ))}
          </Box>

        </Box>
      )}
    </Box>
  );
}