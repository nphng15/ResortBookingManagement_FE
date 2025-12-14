import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router';
import { getToken, getCurrentUser, logout } from '../../../../services/authService';
import type { Account } from '../../../../services/authService';

const pages = [
  { name: 'Partnership', path: '/partnership' },
  { name: 'Bookings', path: '/bookings' },
  { name: 'Cart', path: '/cart' },
];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<Account | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Check auth status on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch {
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = (path: string) => {
    handleCloseNavMenu();
    if (path === '/cart') {
      if (!user) {
        navigate('/auth');
      } else {
        console.log('User ID:', user.account_id);
      }
    } else {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
    setUser(null);
    navigate('/');
  };

  const getAvatarLetter = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return '?';
  };

  const settings = [
    { name: 'Profile', action: () => { handleCloseUserMenu(); navigate('/profile'); } },
    { name: 'Bookings', action: () => { handleCloseUserMenu(); navigate('/bookings'); } },
    { name: 'Logout', action: handleLogout },
  ];

  return (
    <AppBar sx={{ padding: 0, margin: 0, backgroundColor: 'white', color: 'black' }} position="static">
      <Container sx={{ padding: '0 !important' }} maxWidth="lg">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Dlegent
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavClick(page.path)}>
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'black' }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Dlegent
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Box
                key={page.name}
                onClick={() => handleNavClick(page.path)}
                sx={{
                  padding: '16px 20px',
                  color: 'black',
                  fontWeight: 700,
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                {page.name}
              </Box>
            ))}
          </Box>

          {/* Auth Section */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoading ? null : user ? (
              <>
                <Tooltip title="Tài khoản">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 2 }}>
                    <Avatar sx={{ bgcolor: '#1976d2' }}>{getAvatarLetter()}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #eee' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Xin chào,
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.username}
                    </Typography>
                  </Box>
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={setting.action}>
                      <Typography>{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/auth')}
                  sx={{
                    color: '#667eea',
                    borderColor: '#667eea',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    px: 3,
                    py: 1,
                    borderRadius: '25px',
                    '&:hover': {
                      borderColor: '#5a6fd6',
                      backgroundColor: 'rgba(102, 126, 234, 0.08)',
                      color: '#5a6fd6',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Đăng nhập
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/auth')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    px: 3,
                    py: 1,
                    borderRadius: '25px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Đăng ký
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
