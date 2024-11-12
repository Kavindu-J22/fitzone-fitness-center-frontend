import axios from 'axios';

const API_URL = '/api/bookings/';

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}create`, bookingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get all bookings for a user
export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
