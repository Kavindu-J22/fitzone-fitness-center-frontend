import React from 'react';
import { Link } from 'react-router-dom';

const StaffDashboard = () => {
  return (
    <div>
      <h1>Staff Dashboard</h1>
      <div>
        <Link to="/bookings">Manage Bookings</Link>
        <Link to="/queries">View and Respond to Queries</Link>
      </div>
    </div>
  );
};

export default StaffDashboard;
