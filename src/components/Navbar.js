import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/memberships">Memberships</Link></li>
        {role === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
        {role === 'customer' && <li><Link to="/profile">My Profile</Link></li>}
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
