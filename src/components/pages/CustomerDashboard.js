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

  // Function to handle button click and navigate to /contentspage
  const handleNavigation = (category) => {
    navigate('/exploreContent', { state: { category } });
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <a href='/memberships'>Memberships</a>
      <a href='/submitQuerie'>Submit Queries</a>
      <a href='/classList'>Class And Trainings</a>
      <a href='/personalTrainers'>Personal Trainers and Request an appointment</a>
      <a href='/myPayments'>My Payments</a>
      <a href='/myBookings'>My Bookings</a>
        <div>
          <h2>Contents</h2>
          <button onClick={() => handleNavigation('Other')}>Other contents</button>
          <button onClick={() => handleNavigation('Blog Post')}>Blog Post</button>
          <button onClick={() => handleNavigation('Notice')}>Notices</button>
          <button onClick={() => handleNavigation('Meal Plans')}>Meal Plans</button>
          <button onClick={() => handleNavigation('Success Stories')}>Success Stories</button>
          <button onClick={() => handleNavigation('Workout Routines')}>Workout Routines</button>
      </div>
    </div>
  );
}

export default CustomerDashboard;
