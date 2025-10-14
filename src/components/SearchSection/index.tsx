import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import mainBackground from "../../assets/main_background.jpg" 
import Form from './Form'
import Container from '@mui/material/Container'

function SearchSection() {
  return (
    <>
        <Box
            sx={{
                minHeight: '66.67vh',
                backgroundImage: `url(${mainBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ đen mờ 50%
                    zIndex: 1
                }
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Container maxWidth='md'>
                    <Form/>
                </Container>
            </Box>
        </Box>

    </>
  )
}

export default SearchSection
