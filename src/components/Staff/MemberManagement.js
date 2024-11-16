import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllPaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch all payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payment/Allpayments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        alert('Error fetching payment records');
      }
    };
    fetchPayments();
  }, []);


   // Separate payments based on status
   const pendingPayments = payments.filter((payment) => payment.status === 'Pending');
   const acceptedPayments = payments.filter((payment) => payment.status === 'Accepted');
   const rejectedPayments = payments.filter((payment) => payment.status === 'Rejected');

   return (
    <div>
      <h2>Membership Pending Requests</h2>
      {loading && <p>Loading...</p>} {/* Show loading message */}
      <ul>
        {pendingPayments.map((payment) => (
          <li key={payment._id}>
            <p>Package: {payment.packageName}</p>
            <p>User ID: {payment.userId}</p>
            {payment.imageUrl && (
              <img src={payment.imageUrl} alt="Payment Slip" style={{ width: '150px' }} />
            )}
          </li>
        ))}
      </ul>

      <h2>Accepted Members</h2>
      <ul>
        {acceptedPayments.map((payment) => (
          <li key={payment._id}>
            <p>Package: {payment.packageName}</p>
            <p>User ID: {payment.userId}</p>
            {payment.imageUrl && (
              <img src={payment.imageUrl} alt="Payment Slip" style={{ width: '150px' }} />
            )}
            <p>Status: {payment.status}</p>
          </li>
        ))}
      </ul>

      <h2>Rejected Members</h2>
      <ul>
        {rejectedPayments.map((payment) => (
          <li key={payment._id}>
            <p>Package: {payment.packageName}</p>
            <p>User ID: {payment.userId}</p>
            {payment.imageUrl && (
              <img src={payment.imageUrl} alt="Payment Slip" style={{ width: '150px' }} />
            )}
            <p>Status: {payment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPaymentPage;
