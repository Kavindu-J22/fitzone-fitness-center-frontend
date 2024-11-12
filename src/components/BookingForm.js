import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ classId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', { classId, name, email, bookingDate });
      alert('Booking successful');
    } catch (err) {
      setError('Booking failed');
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a Class</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
