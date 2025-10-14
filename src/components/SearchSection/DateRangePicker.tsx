import { useEffect, useRef, useState } from "react";
import { Box, TextField, Button, Grid, Typography, IconButton } from '@mui/material';
import { CalendarToday, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

export default function DateRangePicker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const datepickerRef = useRef(null);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<Box key={`empty-${i}`}></Box>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayString = day.toLocaleDateString("en-US");
      
      let isSelected = false;
      let isInRange = false;
      
      if (selectedStartDate && dayString === selectedStartDate) {
        isSelected = true;
      }
      if (selectedEndDate && dayString === selectedEndDate) {
        isSelected = true;
      }
      if (
        selectedStartDate &&
        selectedEndDate &&
        new Date(day) > new Date(selectedStartDate) &&
        new Date(day) < new Date(selectedEndDate)
      ) {
        isInRange = true;
      }

      daysArray.push(
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            width: 40,
            height: 40,
            borderRadius: isSelected ? '50%' : (isInRange ? '0' : '50%'),
            backgroundColor: isSelected ? 'primary.main' : (isInRange ? 'grey.200' : 'transparent'),
            color: isSelected ? 'white' : 'inherit',
            '&:hover': {
              backgroundColor: isSelected ? 'primary.dark' : 'grey.100'
            }
          }}
          onClick={() => handleDayClick(day)}
        >
          {i}
        </Box>
      );
    }

    return daysArray;
  };

  const handleDayClick = (selectedDay: any) => {
    const dayString = selectedDay.toLocaleDateString("en-US");

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(dayString);
      setSelectedEndDate(null);
    } else {
      if (new Date(selectedDay) < new Date(selectedStartDate)) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(dayString);
      } else {
        setSelectedEndDate(dayString);
      }
    }
  };

  const updateInput = () => {
    if (selectedStartDate && selectedEndDate) {
      return `${selectedStartDate} - ${selectedEndDate}`;
    } else if (selectedStartDate) {
      return selectedStartDate;
    } else {
      return "";
    }
  };

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
  };

  const handleApply = () => {
    console.log("Applied:", selectedStartDate, selectedEndDate);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <Box sx={{ position: 'relative' }} ref={datepickerRef}>
      <TextField
        fullWidth
        placeholder="Chọn ngày check-in và check-out"
        value={updateInput()}
        onClick={toggleDatepicker}
        InputProps={{
          startAdornment: <CalendarToday sx={{ mr: 1, color: 'grey.500' }} />,
          endAdornment: <KeyboardArrowDown sx={{ cursor: 'pointer' }} onClick={toggleDatepicker} />,
          readOnly: true
        }}
        sx={{borderRadius: 4, backgroundColor: 'white'}}

      />

      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            backgroundColor: 'white',
            border: 1,
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1000,
            p: 2
          }}
        >
          {/* Header với navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <IconButton onClick={goToPreviousMonth} size="small">
              <KeyboardArrowLeft />
            </IconButton>
            
            <Typography variant="h6">
              {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            </Typography>
            
            <IconButton onClick={goToNextMonth} size="small">
              <KeyboardArrowRight />
            </IconButton>
          </Box>

          {/* Days of week header */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Box key={day} sx={{ 
                textAlign: 'center', 
                py: 1, 
                fontSize: '0.875rem', 
                fontWeight: 500, 
                color: 'grey.600',
                width: 40,
                height: 40,
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
            {renderCalendar()}
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2, pt: 2, borderTop: 1, borderColor: 'grey.300' }}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApply}>
              Apply
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}