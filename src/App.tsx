import AppRoutes from './routes';
import './index.css';
import ResortList from './pages/ResortList';
import Navbar from './layouts/DefaultLayout/components/Navbar';
import { BrowserRouter } from 'react-router';
import ResortDetails from './pages/ResortDetails';
import ResortReview from './components/ResortSection/ResortReview';
import Footer from './layouts/DefaultLayout/components/Footer';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* <ResortList/> */}
        {/* <ResortDetails/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
