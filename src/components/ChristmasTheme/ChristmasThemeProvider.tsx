import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import './christmas.css';

interface ChristmasThemeContextType {
  isChristmasTheme: boolean;
  toggleChristmasTheme: () => void;
}

const ChristmasThemeContext = createContext<ChristmasThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'christmas-theme-enabled';

export function ChristmasThemeProvider({ children }: { children: ReactNode }) {
  const [isChristmasTheme, setIsChristmasTheme] = useState<boolean>(() => {
    // Check localStorage for persisted preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return stored === 'true';
    }
    // Default: enable Christmas theme during December
    const currentMonth = new Date().getMonth();
    return currentMonth === 11; // December is month 11 (0-indexed)
  });

  useEffect(() => {
    // Persist preference to localStorage
    localStorage.setItem(STORAGE_KEY, String(isChristmasTheme));
    
    // Add/remove class on body for global styling
    if (isChristmasTheme) {
      document.body.classList.add('christmas-theme-active');
    } else {
      document.body.classList.remove('christmas-theme-active');
    }
  }, [isChristmasTheme]);

  const toggleChristmasTheme = () => {
    setIsChristmasTheme(prev => !prev);
  };

  return (
    <ChristmasThemeContext.Provider value={{ isChristmasTheme, toggleChristmasTheme }}>
      {children}
    </ChristmasThemeContext.Provider>
  );
}

export function useChristmasTheme() {
  const context = useContext(ChristmasThemeContext);
  if (context === undefined) {
    throw new Error('useChristmasTheme must be used within a ChristmasThemeProvider');
  }
  return context;
}

export default ChristmasThemeProvider;
