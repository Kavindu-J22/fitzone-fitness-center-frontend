import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [editMode, setEditMode] = useState(null); // Track which class is being edited
  const [editedClass, setEditedClass] = useState({}); // Store edited class data

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
    } catch (error) {
      alert('Error adding class: ' + error.message);
    }
  };

    // Fetch classes from backend
    const fetchClasses = async () => {
        try {
        const response = await axios.get('http://localhost:5000/api/class/getClasses');
        // Assuming you have a state variable called 'classes' to store the fetched classes
        setClasses(response.data); // Update the state with the fetched classes
        } catch (error) {
        alert('Error fetching classes: ' + error.message);
        }
    };
  
    
      useEffect(() => {
        fetchClasses(); // Fetch classes when the component is mounted
      }, []);
    
  // Handle class deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/class/deleteClass/${id}`);
      alert('Class deleted successfully!');
      setClasses(classes.filter((classItem) => classItem._id !== id)); // Remove the deleted class from state
    } catch (error) {
      alert('Error deleting class: ' + error.message);
    }
  };

  // Handle edit button click
  const handleEdit = (classItem) => {
    setEditMode(classItem._id); // Set the edit mode to the current class ID
    setEditedClass(classItem); // Initialize the edited class data
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
      setEditMode(null); // Exit edit mode
      fetchClasses(); // Refresh the classes list
    } catch (error) {
      alert('Error updating class: ' + error.message);
    }
  };


  return (
    <div>
      <h2>Add New Session</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Session Type</label>
          <select 
            id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required
          >
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
                  <p><strong>Session Name:</strong> {classItem.sessionName}</p>
                  <p><strong>Description:</strong> {classItem.description}</p>
                  <p><strong>Schedule:</strong> {classItem.schedule}</p>
                  <p><strong>Time:</strong> {classItem.time}</p>
                  <p><strong>Instructor:</strong> {classItem.instructor}</p>
                  <p><strong>Capacity:</strong> {classItem.capacity}</p>
                  <p><strong>Type:</strong> {classItem.type}</p>
                  <p><strong>Scheduled by:</strong> {classItem.userName}</p>
                  <button onClick={() => handleEdit(classItem)}>Edit</button>
                  <button onClick={() => handleDelete(classItem._id)}>Delete</button>
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
