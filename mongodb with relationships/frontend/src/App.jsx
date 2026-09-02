import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Buses from './pages/Buses';
import Conductors from './pages/Conductors';
import Passengers from './pages/Passengers';
import Tickets from './pages/Tickets';

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/conductors" element={<Conductors />} />
            <Route path="/passengers" element={<Passengers />} />
            <Route path="/tickets" element={<Tickets />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
