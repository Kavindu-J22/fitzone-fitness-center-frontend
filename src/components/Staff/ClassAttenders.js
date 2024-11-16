import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ClassAttendersPage = () => {
  const location = useLocation();
  const { classId, className } = location.state || {};
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);

  useEffect(() => {
    if (classId) {
      // Fetch bookings using the itemId (classId)
      axios
        .get(`http://localhost:5000/api/booking/AcceptedBookings/${classId}`)
        .then((response) => {
          const bookings = response.data.bookings || [];

          // Separate accepted and rejected bookings
          const accepted = bookings.filter(
            (booking) => booking.bookingStatus === 'Accepted'
          );
          const rejected = bookings.filter(
            (booking) => booking.bookingStatus === 'Rejected'
          );

          setAcceptedBookings(accepted);
          setRejectedBookings(rejected);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
        });
    }
  }, [classId]);

  // Function to handle deleting a rejected booking
  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/booking/DeleteBookings/${bookingId}`);
      alert('Booking deleted successfully!');
      // Update the rejected bookings list after deletion
      setRejectedBookings(rejectedBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      alert('Error deleting booking: ' + error.message);
    }
  };

  return (
    <div>
      <h1>{className}</h1>

      <h2>Accepted Attenders</h2>
      {acceptedBookings.length > 0 ? (
        <ul>
          {acceptedBookings.map((booking) => (
            <li key={booking._id}>
              <p>User: {booking.username}</p>
              <p>Title: {booking.bookingTitle}</p>
              <p>Type: {booking.bookingType}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accepted attenders found.</p>
      )}

      <h2>Rejected Attenders</h2>
      {rejectedBookings.length > 0 ? (
        <ul>
          {rejectedBookings.map((booking) => (
            <li key={booking._id}>
              <p>User: {booking.username}</p>
              <p>Title: {booking.bookingTitle}</p>
              <p>Type: {booking.bookingType}</p>
              {/* Delete button for rejected attenders */}
              <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rejected attenders found.</p>
      )}
    </div>
  );
};

export default ClassAttendersPage;
