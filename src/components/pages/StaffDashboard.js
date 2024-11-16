import React from 'react';

const CustomerDashboard = () => {
    return (
        <div>
            <h2>staff Dashboard</h2>
            <p>Welcome to your dashboard. View your fitness journey and manage memberships here.</p>
            <a href='/manageQuerie'>Manage Queries</a>
            <a href='/classManagement'>Class Management</a>
            <a href='/staffApoinmentManagement'>Apoinment Management</a>
            <a href='/viewMembers'>View Members</a>
            <a href='/contentmanagement'>Content Management</a>
        </div>
    );
};

export default CustomerDashboard;
