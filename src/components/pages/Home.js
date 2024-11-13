import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome to FitZone Fitness Center</h1>
            {user ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    {user.role === 'admin' && <Link to="/admin-dashboard">Admin Dashboard</Link>}
                    {user.role === 'staff' && <Link to="/staff-dashboard">Staff Dashboard</Link>}
                    {user.role === 'customer' && <Link to="/customer-dashboard">Customer Dashboard</Link>}
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </div>
    );
};

export default Home;
