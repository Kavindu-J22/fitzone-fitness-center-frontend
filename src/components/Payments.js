import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { packageName } = location.state || {};
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const userId = localStorage.getItem('userId');

  const cloudName = 'dgecq2e6l'; // Your Cloudinary cloud name

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'jmrpithq'); // Your upload preset name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url);
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  const handleSubmit = async () => {
    // Check if imageUrl is set
    if (!imageUrl) {
      alert('Please upload your payment slip before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/payment/payments', {
        packageName,
        userId,
        imageUrl,
      });

      console.log('Response from server:', response.data);
      alert('Payment slip uploaded successfully!');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error saving payment slip');
    }
  };

  return (
    <div>
      <h2>Upload Your Payment Slip</h2>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Payment Slip" style={{ width: '300px', marginTop: '10px' }} />}
      <button onClick={handleSubmit}>Submit Payment</button>
    </div>
  );
};

export default PaymentPage;
