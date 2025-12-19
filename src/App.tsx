import AppRoutes from './routes';
import './index.css';
import { ChristmasThemeProvider, ChristmasToggle, Snowfall } from './components/ChristmasTheme';

function App() {
  return (
    <ChristmasThemeProvider>
      <Snowfall />
      <AppRoutes />
      <ChristmasToggle />
    </ChristmasThemeProvider>
  );
}

export default App;
