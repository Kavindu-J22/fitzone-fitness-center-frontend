import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [expandedClassId, setExpandedClassId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/class/getClasses');
      setClasses(response.data);
    } catch (error) {
      alert('Error fetching classes: ' + error.message);
    }
  };

  const handleViewMore = (classId) => {
    setExpandedClassId(classId === expandedClassId ? null : classId); // Toggle expansion
  };

  const handleAppointment = async (classId, className) => {
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
          itemId: classId,
          username: username
        }
      });
  
      const { exists } = existingBookingResponse.data;
  
      if (exists) {
        alert('You have already added an appointment for this class. Check your booking to know your appointment status.');
        return; // Stop further execution
      }
  
      // Step 2: If no existing booking, proceed with appointment and booking
      // First, update the attenders for the class
      await axios.put('http://localhost:5000/api/class/updateAttenders', {
        classId: classId,
        attendeeName: username
      });
  
      // Now create a new booking
      await axios.post('http://localhost:5000/api/booking/addBookings', {
        userId: userId,
        username: username,
        bookingTitle: `Class: ${className}`,
        bookingType: 'class',
        itemId: classId,
      });
  
      alert('Successfully joined the class and booked your spot!');
      fetchClasses(); // Refresh the class list to update capacity
  
    } catch (error) {
      alert('Error joining class or creating booking: ' + error.message);
    }
  };


  return (
    <div>
      <h2>Class List</h2>
      {classes.length > 0 ? (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem._id}>
              <h3>{classItem.type}</h3>
              <h3>{classItem.className}</h3>
              <p>{classItem.description}</p>
              <p>Schedule: {classItem.schedule}</p>
              <p>Time: {classItem.time}</p>
              <p>Instructor: {classItem.instructor}</p>
              <p>Capacity: {classItem.capacity}</p>

              {/* View More Button */}
              <button onClick={() => handleViewMore(classItem._id)}>
                {expandedClassId === classItem._id ? 'Hide Details' : 'View More'}
              </button>

              {/* Show Appointment button when View More is clicked */}
              {expandedClassId === classItem._id && (
                <button onClick={() => handleAppointment(classItem._id, classItem.className)}>
                  Appointment Now
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No classes available</p>
      )}
    </div>
  );
};

export default ClassList;
