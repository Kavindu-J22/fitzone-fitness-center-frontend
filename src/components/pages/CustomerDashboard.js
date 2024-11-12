import React from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <div>
        <Link to="/classes">View and Book Classes</Link>
        <Link to="/memberships">Check Membership Plans</Link>
        <Link to="/profile">Update Your Profile</Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;
