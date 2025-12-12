import { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { People, Add, Remove } from '@mui/icons-material';

interface GuestPickerProps {
  guests: number;
  setGuests: (value: number) => void;
}

export default function GuestPicker({ guests, setGuests }: GuestPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleGuestsChange = (delta: number) => {
    setGuests(guests + delta);
  };

  return (
    <Box sx={{ position: 'relative' }} ref={pickerRef}>
      <Typography variant="body2" sx={{ fontSize: '1rem', mb: 1, color: 'text.secondary', fontWeight: 500 }}>
        Số khách
      </Typography>
      
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          p: 2,
          border: 2,
          borderColor: isOpen ? '#0064D2' : '#E0E0E0',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <People sx={{ fontSize: 20, color: '#666' }} />
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#000' }}>
            {guests} người
          </Typography>
        </Box>
      </Box>

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
            borderColor: '#E0E0E0',
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 1000,
            p: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton
              onClick={() => handleGuestsChange(-1)}
              disabled={guests <= 1}
              sx={{
                border: 1,
                borderColor: '#E0E0E0',
                '&:hover': { borderColor: '#0064D2', backgroundColor: '#F5F5F5' },
                '&.Mui-disabled': { borderColor: '#F0F0F0' }
              }}
            >
              <Remove sx={{ fontSize: 20 }} />
            </IconButton>
            
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, minWidth: 40, textAlign: 'center' }}>
              {guests}
            </Typography>
            
            <IconButton
              onClick={() => handleGuestsChange(1)}
              disabled={guests >= 10}
              sx={{
                border: 1,
                borderColor: '#E0E0E0',
                '&:hover': { borderColor: '#0064D2', backgroundColor: '#F5F5F5' },
                '&.Mui-disabled': { borderColor: '#F0F0F0' }
              }}
            >
              <Add sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
