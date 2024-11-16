import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './components/context/AuthContext';
import Home from './components/pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/pages/AdminDashboard';
import StaffDashboard from './components/pages/StaffDashboard';
import CustomerDashboard from './components/pages/CustomerDashboard';
import Payments from './components/Payments';
import AddStaff from './components/Admin/AddStaff';
import Membermanage from './components/Admin/MemberManagement';
import Memberships from './components/Customer/Membership';
import SubmitQuerie from './components/Customer/SubmitQueries';
import ManageQuerie from './components/Staff/QueryManagement';
import ManageUsers from './components/Admin/UserManagement';
import ClassManagement from './components/Staff/ClassManagement'
import ClassList from './components/Customer/ClassAndTraining';
import ServiceManage from './components/Admin/ServiceManagement';
import ClassAttenders from './components/Staff/ClassAttenders';
import MyPayments from './components/Customer/MyPayments';
import MyBookings from './components/Customer/MyBokings';
import PersonalTrainers from './components/Customer/PersonalTraining';
import StaffApoinmentManagement from './components/Staff/AppointmentManagement'
import ViewMembers from './components/Staff/MemberManagement';
import Contentmanagement from './components/Staff/ContentManagement';
import AdminContentmanagement from './components/Admin/ContentManagement';
import ExploreContent from './components/Customer/ExploreContent';
 import AllBookings from './components/Admin/AllBookings.js';
 import './index.css'

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/admin-dashboard"
                    element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/staff-dashboard"
                    element={user?.role === 'staff' ? <StaffDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/customer-dashboard"
                    element={user?.role === 'customer' ? <CustomerDashboard /> : <Navigate to="/login" />}
                />

                <Route path="/memberships" element={<Memberships />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/addStaff" element={<AddStaff />} />
                <Route path="/membermanage" element={<Membermanage />} />
                <Route path="/submitQuerie" element={<SubmitQuerie />} />
                <Route path="/manageQuerie" element={<ManageQuerie />} />
                <Route path="/manageUsers" element={<ManageUsers />} />
                <Route path="/classManagement" element={<ClassManagement />} />
                <Route path="/classList" element={<ClassList />} />
                <Route path="/serviceManage" element={<ServiceManage />} />
                <Route path="/classAttendersPage" element={<ClassAttenders />} />
                <Route path="/myPayments" element={<MyPayments />} />
                <Route path="/myBookings" element={<MyBookings />} />
                <Route path="/personalTrainers" element={<PersonalTrainers />} />
                <Route path="/staffApoinmentManagement" element={<StaffApoinmentManagement />} />
                <Route path="/viewMembers" element={<ViewMembers />} />
                <Route path="/contentmanagement" element={<Contentmanagement />} />
                <Route path="/adminContentmanagement" element={<AdminContentmanagement />} />
                <Route path="/exploreContent" element={<ExploreContent />} />
                <Route path="/allBookings" element={<AllBookings />} />

            </Routes>
        </Router>
    );
}

export default function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
