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

// Handle Accept
const handleAccept = async (paymentUserId, packageName, paymentId) => {
    setLoading(true); // Start loading
    try {
      // First API call (to one cluster)
      const response1 = await axios.put('http://localhost:5000/api/user/UpdateSubscription', {
        userId: paymentUserId,
        subscription: packageName,
      });
  
      // Second API call (to another cluster or API)
      const response2 = await axios.put('http://localhost:5000/api/payment/UpdateStatus', {
        paymentId: paymentId,
        status: 'Accepted',
      });
  
      // Optionally, you can process the responses from both APIs
      console.log('Response from Cluster 1:', response1.data);
      console.log('Response from Cluster 2:', response2.data);
  
      
      alert('User subscription updated successfully');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update user subscription');
    } finally {
      setLoading(false); // End loading
    }
  };
  

  // Handle Reject
  const handleReject = async (paymentId) => {
    setLoading(true); // Start loading
    try {
      // Send the request with the userId and MemberStatus in the body
      await axios.put('http://localhost:5000/api/payment/UpdateStatus', {
        paymentId: paymentId,
        status: 'Rejected',
      });

      
      alert('User subscription rejected successfully');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to reject user subscription');
    } finally {
      setLoading(false); // End loading
    }
  };

   // Separate payments based on status
   const pendingPayments = payments.filter((payment) => payment.status === 'Pending');
   const acceptedPayments = payments.filter((payment) => payment.status === 'Accepted');
   const rejectedPayments = payments.filter((payment) => payment.status === 'Rejected');

   return (
    <div>
      <h2>Membership Requests</h2>
      {loading && <p>Loading...</p>} {/* Show loading message */}
      <ul>
        {pendingPayments.map((payment) => (
          <li key={payment._id}>
            <p>Package: {payment.packageName}</p>
            <p>User ID: {payment.userId}</p>
            {payment.imageUrl && (
              <img src={payment.imageUrl} alt="Payment Slip" style={{ width: '150px' }} />
            )}
            <div>
              <button
                onClick={() => handleAccept(payment.userId, payment.packageName, payment._id)}
                disabled={loading} // Disable while loading
              >
                Accept
              </button>
              <button onClick={() => handleReject(payment._id)} disabled={loading}>
                Reject
              </button>
            </div>
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
