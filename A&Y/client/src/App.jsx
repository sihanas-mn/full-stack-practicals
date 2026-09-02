import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/public/Home';
import Project from './pages/public/Project';
import Residences from './pages/public/Residences';
import Amenities from './pages/public/Amenities';
import Location from './pages/public/Location';
import Timeline from './pages/public/Timeline';
import Market from './pages/public/Market';
import Investor from './pages/public/Investor';
import About from './pages/public/About';
import FAQ from './pages/public/FAQ';
import Contact from './pages/public/Contact';
import Legal from './pages/public/Legal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/residences" element={<Residences />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/location" element={<Location />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/market" element={<Market />} />
            <Route path="/investor" element={<Investor />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal type="privacy" />} />
            <Route path="/terms" element={<Legal type="terms" />} />
            <Route path="/disclaimer" element={<Legal type="disclaimer" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
