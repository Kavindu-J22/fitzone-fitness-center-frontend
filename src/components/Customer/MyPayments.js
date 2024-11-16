import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPayments = () => {
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the userId from local storage

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payment/Allpayments');
      // Filter payments to include only those that match the current user's userId
      const userPayments = response.data.filter(payment => payment.userId === userId);
      setPayments(userPayments);
    } catch (error) {
      alert('Error fetching payments: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Your Payments</h2>
      {payments.length > 0 ? (
        <ul>
          {payments.map((payment) => (
            <li key={payment._id}>
              <p>Package: {payment.packageName}</p>
              <p>Status: {payment.status}</p>
              <img src={payment.imageUrl} alt="Payment Proof" style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments found for your account.</p>
      )}
    </div>
  );
};

export default UserPayments;
