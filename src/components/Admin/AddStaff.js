import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddStaff = () => {
    const [staffUsername, setStaffUsername] = useState('');
    const [staffPassword, setStaffPassword] = useState('');
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

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/deleteUser/${id}`);
      alert('User deleted successfully!');
      // Remove the deleted user from the state
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert('Error deleting user: ' + error.message);
    }
  };

    const handleAddStaff = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/add-staff', { username: staffUsername, password: staffPassword });
            alert('Staff member added successfully');
        } catch (error) {
            alert('Error adding staff member');
        }
    };

    return (
        <div>
            <h2>Add Staff Member</h2>
            <form onSubmit={handleAddStaff}>
                <input
                    type="text"
                    placeholder="Staff Username"
                    value={staffUsername}
                    onChange={(e) => setStaffUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Staff Password"
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                />
                <button type="submit">Add Staff</button>
            </form>

            <div>
                <h2>Staff Users</h2>
                {users.length > 0 ? (
                    <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                        <h3>{user.username}</h3>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Subscription:</strong> {user.subscription}</p>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
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

export default AddStaff;
