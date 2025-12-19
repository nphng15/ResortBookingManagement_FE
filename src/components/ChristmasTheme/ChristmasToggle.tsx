import { useChristmasTheme } from './ChristmasThemeProvider';

function ChristmasToggle() {
  const { isChristmasTheme, toggleChristmasTheme } = useChristmasTheme();

  return (
    <button
      onClick={toggleChristmasTheme}
      className={`christmas-toggle-btn ${!isChristmasTheme ? 'inactive' : ''}`}
      title={isChristmasTheme ? 'Tắt giao diện Giáng sinh' : 'Bật giao diện Giáng sinh'}
      aria-label={isChristmasTheme ? 'Disable Christmas theme' : 'Enable Christmas theme'}
    >
      {isChristmasTheme ? '🎁' : '️'}
    </button>
  );
}

export default ChristmasToggle;
