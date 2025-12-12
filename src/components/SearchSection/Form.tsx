import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import DateRangePicker from './DateRangePicker'
import GuestPicker from './GuestPicker'
import { useState } from 'react'

function Form() {
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState(2);
    const [destination, setDestination] = useState('');
// TODO: cần tối ưu state destination -> đợi user ngừng nhập thì mới update state

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    };

    const handleSearch = () => {
        const params = new URLSearchParams({
            name: destination,
            checkin: formatDate(selectedStartDate),
            checkout: formatDate(selectedEndDate),
            number: guests.toString(),
        });
        
        // Open in new tab
        window.open(`/search?${params.toString()}`, '_blank');
    }
    return (
    <Container sx={{ px: '0 !important', py: '10rem'}}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                    fontWeight: 600, 
                    color: 'white',
                    mb: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
            >
                Tìm Kiếm Resort Hoàn Hảo
            </Typography>
            <Typography 
                variant="subtitle1" 
                sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    mb: 3,
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
            >
                Khám phá những kỳ nghỉ tuyệt vời tại các resort hàng đầu
            </Typography>
        </Box>

        {/* Search Form */}
        <Box sx={{ 
            p: 3, 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
        }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }} sx={{ mb: 3}}>
                    <Typography variant="body2" sx={{ fontSize:'1rem', mb: 1, color: 'text.secondary', fontWeight: 500 }}>
                        Điểm đến
                    </Typography>
                    <TextField
                        fullWidth 
                        placeholder="Tìm kiếm resort, khách sạn..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: 'grey.400' }} />
                        }}
                        sx={{ 
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                    borderColor: 'primary.main'
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <GuestPicker 
                        guests={guests}
                        setGuests={setGuests}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <DateRangePicker 
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        setSelectedStartDate={setSelectedStartDate}
                        setSelectedEndDate={setSelectedEndDate}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                        onClick={handleSearch}
                        fullWidth 
                        variant="contained" 
                        size="large"
                        sx={{
                            borderRadius: 2,
                            py: 1.75,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
                            '&:hover': {
                                boxShadow: '0 6px 20px rgba(25,118,210,0.4)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Tìm Kiếm
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Container>
  )
}

export default Form
