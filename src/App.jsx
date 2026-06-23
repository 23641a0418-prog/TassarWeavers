import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Process from './pages/Process';
import OurStory from './pages/OurStory';
import CustomDesign from './pages/CustomDesign';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function LayoutWrapper() {
  const location = useLocation();
  // Check if the current route belongs to the administrative panel
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-tassar-cream text-tassar-earth selection:bg-tassar-raw selection:text-tassar-earth">
      {/* Conditionally render the public navbar ONLY when NOT on admin routes */}
      {!isAdminRoute && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/process" element={<Process />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/custom-design" element={<CustomDesign />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <LayoutWrapper />
      </Router>
    </CartProvider>
  );
}