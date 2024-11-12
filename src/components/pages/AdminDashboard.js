import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <Link to="/users">Manage Users</Link>
        <Link to="/classes">Manage Classes</Link>
        <Link to="/bookings">Manage Bookings</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
