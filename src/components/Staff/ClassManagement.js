import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const [time, setTime] = useState('');
  const [instructor, setInstructor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');
  const userName = localStorage.getItem('username');
  const [classes, setClasses] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedClass, setEditedClass] = useState({});
  const [attendanceMode, setAttendanceMode] = useState(null); // Track which class's attendance is being viewed
  const [attenders, setAttenders] = useState([]); // Store attendees for the selected class
  const [statuses, setStatuses] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newClass = { type, className, description, schedule, time, instructor, capacity, userName };
      await axios.post('http://localhost:5000/api/class/addClass', newClass);
      alert('Class added successfully!');
      setClassName('');
      setDescription('');
      setSchedule('');
      setTime('');
      setInstructor('');
      setCapacity('');
      setType('');
      fetchClasses();
    } catch (error) {
      alert('Error adding class: ' + error.message);
    }
  };

  // Fetch classes from backend
  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/class/getClasses');
      const storedUsername = localStorage.getItem('username');
      const filteredClasses = response.data.filter((classItem) => classItem.userName === storedUsername);
      setClasses(filteredClasses);
    } catch (error) {
      alert('Error fetching classes: ' + error.message);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Handle class deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/class/deleteClass/${id}`);
      alert('Class deleted successfully!');
      setClasses(classes.filter((classItem) => classItem._id !== id));
    } catch (error) {
      alert('Error deleting class: ' + error.message);
    }
  };

  // Handle edit button click
  const handleEdit = (classItem) => {
    setEditMode(classItem._id);
    setEditedClass(classItem);
  };

  // Handle input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClass({ ...editedClass, [name]: value });
  };

  // Handle class update
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/class/updateClass/${id}`, editedClass);
      alert('Class updated successfully!');
      setEditMode(null);
      fetchClasses();
    } catch (error) {
      alert('Error updating class: ' + error.message);
    }
  };

  // Handle view attendance
  const handleViewAttendance = (classItem) => {
    setAttendanceMode(classItem._id);
    setAttenders(classItem.attenders || []); // Load the attendees from classItem
  };

// Handle reject attendee
const handleReject = async (classId, attendeeName) => {
  try {
    // First, remove the attendee from the class
    await axios.put('http://localhost:5000/api/class/removeAttender', { classId, attendeeName });

  // Then, Update the booking Status
    await axios.put(`http://localhost:5000/api/booking/updateStatus/${classId}/${attendeeName}`, {
      bookingStatus: 'Rejected',  // Directly send bookingStatus in the body
    });

    // Update the status state for this attendee
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [attendeeName]: 'Rejected'
    }));

    alert(`${attendeeName} has been removed from the class and their booking has been cancelled.`);
    fetchClasses();  // Refresh the class list to update capacity

  } catch (error) {
    alert('Error removing attendee or deleting booking: ' + error.message);
  }
};

// Handle reject attendee
const handleAccept = async ( classId, attendeeName) => {
  try {
    // First, remove the Accepted attendee from the class
    await axios.put('http://localhost:5000/api/class/removeAcceptedAttender', { classId, attendeeName });
  //  Update the booking Status
    await axios.put(`http://localhost:5000/api/booking/updateStatus/${classId}/${attendeeName}`, {
      bookingStatus: 'Accepted',  // Directly send bookingStatus in the body
    });

  // Update the status state for this attendee
  setStatuses((prevStatuses) => ({
    ...prevStatuses,
    [attendeeName]: 'Accepted'
    }));

    alert(`${attendeeName} has been Accepted from the class and their booking has been Approved.`);
    fetchClasses();  // Refresh the class list to update capacity

  } catch (error) {
    alert('Error Accepting attendee or Update booking: ' + error.message);
  }
};

const handleViewAcceptedAttendance = (classId, className) => {
  // Navigate to /classAttendersPage and pass data as state
  navigate('/classAttendersPage', {
    state: {
      classId,
      className
    }
  });
};


  return (
    <div>
      <h2>Add New Session</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for adding new class */}
        <div>
          <label htmlFor="type">Session Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="class">Class</option>
            <option value="training">Training Session</option>
            <option value="event">Event</option>
            <option value="special">Special</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Session Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />

        <textarea
          placeholder="Class Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Class Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Class Time (e.g., 6:00 PM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Trainer/Supervisor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />

        <button type="submit">Add Session</button>
      </form>

      <div>
        <h2>Your Classes</h2>
        {classes.length > 0 ? (
          <div>
            {classes.map((classItem) => (
              <div key={classItem._id} className="class-card">
                {editMode === classItem._id ? (
                  <div>
                    {/* Edit Mode Form */}
                    <input
                      type="text"
                      name="className"
                      placeholder="Session Name"
                      value={editedClass.className || ''}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="description"
                      placeholder="Class Description"
                      value={editedClass.description || ''}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="schedule"
                      placeholder="Class Schedule"
                      value={editedClass.schedule || ''}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="time"
                      placeholder="Class Time"
                      value={editedClass.time || ''}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="instructor"
                      placeholder="Instructor"
                      value={editedClass.instructor || ''}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      name="capacity"
                      placeholder="Capacity"
                      value={editedClass.capacity || ''}
                      onChange={handleInputChange}
                    />
                    <button onClick={() => handleUpdate(classItem._id)}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    {/* Display Mode */}
                    <h3>{classItem.className}</h3>
                    <p><strong>Description:</strong> {classItem.description}</p>
                    <p><strong>Schedule:</strong> {classItem.schedule}</p>
                    <p><strong>Time:</strong> {classItem.time}</p>
                    <p><strong>Instructor:</strong> {classItem.instructor}</p>
                    <p><strong>Capacity:</strong> {classItem.capacity}</p>
                    <p><strong>Type:</strong> {classItem.type}</p>
                    <button onClick={() => handleEdit(classItem)}>Edit</button>
                    <button onClick={() => handleDelete(classItem._id)}>Delete</button>
                    <button onClick={() => handleViewAttendance(classItem)}>Manage Appointments</button>
                    <button onClick={() => handleViewAcceptedAttendance(classItem._id, classItem.className)}>View Attenders</button>
                  </div>
                )}

                {/* Attendance List */}
                {attendanceMode === classItem._id && (
                  <div>
                    <h4>Attendees</h4>
                    {attenders.length > 0 ? (
                      <ul>
                        {attenders.map((attendee, index) => (
                           <li key={index}>
                           {attendee}
                           {statuses[attendee] ? (
                             // Display status (Accepted or Rejected) if it's set
                             <span>{statuses[attendee]}</span>
                           ) : (
                             <>
                               {/* Display buttons only if the status is not set yet */}
                               <button onClick={() => handleAccept(classItem._id, attendee)}>Approve</button>
                               <button onClick={() => handleReject(classItem._id, attendee)}>Reject</button>
                             </>
                           )}
                         </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No any appointments at this time for this class.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No classes found for your username.</p>
        )}
      </div>
    </div>
  );
};

export default AddClass;
