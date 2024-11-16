import React  from 'react';


const AdminDashboard = () => {
    return (
        <div className='pagelist'>
            <h2>Admin Dashboard</h2>
            <a href='/addStaff'>Manage Staff</a>
            <a href='/membermanage'>Payments and Manage Members</a>
            <a href='/manageUsers'>Manage Users</a>
            <a href='/serviceManage'>Manage Services</a>
            <a href='/adminContentmanagement'>Content Management</a>
            <a href='/allBookings'>Manage Bookings</a>
            <a href='/manageQuerie'>Manage Queries</a>
        </div>
    );
};

export default AdminDashboard;
