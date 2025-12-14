import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { getToken, getCurrentUser, logout } from '../../../../services/authService';
import type { Account } from '../../../../services/authService';

const pages = [
  { name: 'Partnership', path: '/partnership' },
  { name: 'Bookings', path: '/bookings' },
  { name: 'Cart', path: '/cart' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<Account | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  const isHomepage = location.pathname === '/';
  const isTransparent = isHomepage && !isScrolled;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
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
    setUserMenuOpen(false);
    await logout();
    setUser(null);
    navigate('/');
  };

  const getAvatarLetter = () => user?.username?.charAt(0).toUpperCase() || '?';

  const settings = [
    { name: 'Profile', action: () => { setUserMenuOpen(false); navigate('/profile'); } },
    { name: 'Bookings', action: () => { setUserMenuOpen(false); navigate('/bookings'); } },
    { name: 'Logout', action: handleLogout },
  ];

  return (
    <nav className={`${isHomepage ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent 
        ? 'bg-transparent' 
        : 'bg-white/95 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg className={`w-8 h-8 transition-colors ${isTransparent ? 'text-white' : 'text-violet-600'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className={`text-xl font-bold tracking-wider transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
              Dlegent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {pages.map((page) => (
              <button
                key={page.name}
                onClick={() => handleNavClick(page.path)}
                className={`px-4 py-2 font-medium rounded-lg transition-all cursor-pointer ${
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-slate-700 hover:text-violet-600 hover:bg-violet-50'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isLoading ? null : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all cursor-pointer ${
                    isTransparent ? 'bg-white/20 hover:bg-white/30' : 'bg-violet-600 hover:bg-violet-700'
                  }`}
                >
                  {getAvatarLetter()}
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm text-slate-500">Xin chào,</p>
                      <p className="font-semibold text-slate-900">{user.username}</p>
                    </div>
                    {settings.map((setting) => (
                      <button
                        key={setting.name}
                        onClick={setting.action}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        {setting.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => navigate('/auth')}
                  className={`px-5 py-2 font-semibold rounded-full transition-all cursor-pointer ${
                    isTransparent
                      ? 'text-white border-2 border-white/50 hover:bg-white/10'
                      : 'text-violet-600 border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className={`px-5 py-2 font-semibold rounded-full transition-all cursor-pointer ${
                    isTransparent
                      ? 'bg-white text-slate-900 hover:bg-white/90'
                      : 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  Đăng ký
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white rounded-b-2xl shadow-lg">
            {pages.map((page) => (
              <button
                key={page.name}
                onClick={() => handleNavClick(page.path)}
                className="w-full px-4 py-3 text-left text-slate-700 hover:bg-slate-50 font-medium transition-colors cursor-pointer"
              >
                {page.name}
              </button>
            ))}
            {!user && (
              <div className="flex gap-2 px-4 pt-4 border-t border-slate-100 mt-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}
                  className="flex-1 py-2 text-violet-600 border-2 border-violet-200 rounded-full font-semibold cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}
                  className="flex-1 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-full font-semibold cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
