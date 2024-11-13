import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './components/context/AuthContext';
import Home from './components/pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/pages/AdminDashboard';
import StaffDashboard from './components/pages/StaffDashboard';
import CustomerDashboard from './components/pages/CustomerDashboard';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/admin-dashboard"
                    element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/staff-dashboard"
                    element={user?.role === 'staff' ? <StaffDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/customer-dashboard"
                    element={user?.role === 'customer' ? <CustomerDashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
