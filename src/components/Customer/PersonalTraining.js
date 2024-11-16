import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PersonalTrainers = () => {
    const [users, setUsers] = useState([]);

      // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/allUsers');
      // Filter users with the role 'staff'
      const staffUsers = response.data.filter(user => user.role === 'staff');
      setUsers(staffUsers);
    } catch (error) {
      alert('Error fetching users: ' + error.message);
    }
  };

  const handleAppointment = async (staffId, trainerName) => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
  
    if (!username) {
      alert('Please log in first.');
      return;
    }
  
    try {
      // Step 1: Check if a booking already exists
      const existingBookingResponse = await axios.get(`http://localhost:5000/api/booking/checkBooking`, {
        params: {
          itemId: staffId,
          username: username
        }
      });
  
      const { exists } = existingBookingResponse.data;
  
      if (exists) {
        alert('You have already request an appointment for this Trainer. Check your booking to know your appointment status.');
        return; // Stop further execution
      }
  

  
      // Now create a new booking
      await axios.post('http://localhost:5000/api/booking/addBookings', {
        userId: userId,
        username: username,
        bookingTitle: `Personal Trainer Appointment to: ${trainerName}`,
        bookingType: 'Trainer-Appointment',
        itemId: staffId,
      });
  
      alert('Successfully Send the Appointment and booked your spot!');
  
    } catch (error) {
      alert('Error joining class or creating booking: ' + error.message);
    }
  };


    return (
        <div>
            <div>
                <h2>Staff Users</h2>
                {users.length > 0 ? (
                    <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                        <h3>{user.username}</h3>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Subscription:</strong> {user.subscription}</p>
                        <button onClick={() => handleAppointment(user._id, user.username)}>Request Appointment</button>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>No staff users found.</p>
                )}
            </div>
        </div>
    );
};

export default PersonalTrainers;
