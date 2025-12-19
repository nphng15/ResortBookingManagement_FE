import { useState } from 'react';
import AppRoutes from './routes';
import './index.css';
import { ChristmasThemeProvider, ChristmasToggle, Snowfall } from './components/ChristmasTheme';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isServerReady, setIsServerReady] = useState(false);

  if (!isServerReady) {
    return <LoadingScreen onReady={() => setIsServerReady(true)} />;
  }

  return (
    <ChristmasThemeProvider>
      <Snowfall />
      <AppRoutes />
      <ChristmasToggle />
    </ChristmasThemeProvider>
  );
}

export default App;
