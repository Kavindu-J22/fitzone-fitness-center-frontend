import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './components/context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Classes from './components/pages/Classes';
import Memberships from './components/pages/Memberships';
import Blog from './components/pages/Blog';
import Contact from './components/pages/Contact';
import Profile from './components/pages/Profile';
import CustomerDashboard from './components/pages/CustomerDashboard';
import StaffDashboard from './components/pages/StaffDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const userFromStorage = localStorage.getItem('authToken');
    if (userFromStorage) {
      setUser({ token: userFromStorage });
    }
  }, [setUser]);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="/customer-dashboard" element={<ProtectedRoute component={CustomerDashboard} />} />
          <Route path="/staff-dashboard" element={<ProtectedRoute component={StaffDashboard} />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
