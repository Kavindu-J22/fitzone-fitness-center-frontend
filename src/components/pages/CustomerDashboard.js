import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


  const CustomerDashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
  return (
    <div>
      <h2>Customer Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default CustomerDashboard;
