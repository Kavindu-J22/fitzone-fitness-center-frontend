import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [staffUsername, setStaffUsername] = useState('');
    const [staffPassword, setStaffPassword] = useState('');

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
            <h2>Admin Dashboard</h2>
            <h3>Add Staff Member</h3>
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
        </div>
    );
};

export default AdminDashboard;
