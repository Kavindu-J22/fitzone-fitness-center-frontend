import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings from the server when the component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/booking/allBookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      alert('Error fetching bookings: ' + error.message);
      setLoading(false);
    }
  };

  // Function to delete a booking by ID
  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/booking/DeleteBookings/${bookingId}`);
      alert('Booking deleted successfully!');
      fetchBookings(); // Refresh the bookings list after deletion
    } catch (error) {
      alert('Error deleting booking: ' + error.message);
    }
  };

  return (
    <div>
      <h2>All Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} style={{ marginBottom: '20px' }}>
              <h3>{booking.bookingTitle}</h3>
              <p><strong>Type:</strong> {booking.bookingType}</p>
              <p><strong>Status:</strong> {booking.bookingStatus}</p>
              <p><strong>User:</strong> {booking.username}</p>
              <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
              <button onClick={() => handleDelete(booking._id)}>Delete Booking</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default AllBookingsPage;
