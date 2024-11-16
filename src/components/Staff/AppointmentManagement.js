import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainerAppointments = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/booking/AcceptedBookings/${userId}`);
      console.log(response.data); // Check the structure here
  
      // If the response is an object, access the bookings array
      const bookings = response.data.bookings || []; // Use the correct property
  
      if (Array.isArray(bookings)) {
        // Filter bookings to only include those with bookingType = "Trainer-Appointment"
        const trainerAppointments = bookings.filter(booking => booking.bookingType === "Trainer-Appointment");
  
        // Separate the bookings by status
        setPendingBookings(trainerAppointments.filter(booking => booking.bookingStatus === 'pending'));
        setAcceptedBookings(trainerAppointments.filter(booking => booking.bookingStatus === 'Accepted'));
        setRejectedBookings(trainerAppointments.filter(booking => booking.bookingStatus === 'Rejected'));
      } else {
        console.error('Expected an array but got:', bookings);
      }
    } catch (error) {
      alert('Error fetching bookings: ' + error.message);
    }
  };
  
  

  // Function to handle accepting a booking
  const handleAccept = async (userId,username) => {
    try {
      await axios.put(`http://localhost:5000/api/booking/updateStatus/${userId}/${username}`, {
        bookingStatus: 'Accepted'
      });
      alert('Booking accepted successfully.');
      fetchBookings(); // Refresh the bookings
    } catch (error) {
      alert('Error accepting booking: ' + error.message);
    }
  };

  // Function to handle rejecting a booking
  const handleReject = async (userId,username) => {
    try {
      await axios.put(`http://localhost:5000/api/booking/updateStatus/${userId}/${username}`, {
        bookingStatus: 'Rejected'
      });
      alert('Booking rejected successfully.');
      fetchBookings(); // Refresh the bookings
    } catch (error) {
      alert('Error rejecting booking: ' + error.message);
    }
  };

  // Function to handle deleting a booking
  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/booking/DeleteBookings/${bookingId}`);
      alert('Booking deleted successfully.');
      fetchBookings(); // Refresh the bookings
    } catch (error) {
      alert('Error deleting booking: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Trainer Appointments</h2>

      <h3>Pending Appointments</h3>
      {pendingBookings.length > 0 ? (
        <ul>
          {pendingBookings.map((booking) => (
            <li key={booking._id}>
              <p>Title: {booking.bookingTitle}</p>
              <p>Username: {booking.username}</p>
              <button onClick={() => handleAccept( userId, booking.username )}>Accept</button>
              <button onClick={() => handleReject( userId, booking.username )}>Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending appointments.</p>
      )}

      <h3>Accepted Appointments</h3>
      {acceptedBookings.length > 0 ? (
        <ul>
          {acceptedBookings.map((booking) => (
            <li key={booking._id}>
              <p>Title: {booking.bookingTitle}</p>
              <p>Username: {booking.username}</p>
              <button onClick={() => handleDelete(booking._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accepted appointments.</p>
      )}

      <h3>Rejected Appointments</h3>
      {rejectedBookings.length > 0 ? (
        <ul>
          {rejectedBookings.map((booking) => (
            <li key={booking._id}>
              <p>Title: {booking.bookingTitle}</p>
              <p>Username: {booking.username}</p>
              <button onClick={() => handleDelete(booking._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rejected appointments.</p>
      )}
    </div>
  );
};

export default TrainerAppointments;
