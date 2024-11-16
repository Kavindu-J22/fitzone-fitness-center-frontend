import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/booking/allBookings');
      // Filter bookings to only include those that match the current user's userId
      const userBookings = response.data.filter(booking => booking.userId === userId);
      setBookings(userBookings);
    } catch (error) {
      alert('Error fetching bookings: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <h3>{booking.bookingTitle}</h3>
              <p>Type: {booking.bookingType}</p>
              <p>Status: {booking.bookingStatus}</p>
              <p>Created At: {new Date(booking.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found for your account.</p>
      )}
    </div>
  );
};

export default UserBookings;
