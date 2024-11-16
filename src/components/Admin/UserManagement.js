import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

      // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/allUsers');
      // Filter users with the role 'customer'
      const staffUsers = response.data.filter(user => user.role === 'customer');
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

    return (
        <div>
            <div>
                <h2>Management Users</h2>
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

export default ManageUsers;
