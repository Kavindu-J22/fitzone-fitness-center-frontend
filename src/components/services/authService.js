import axios from 'axios';

// Base URL for the API
const API_URL = '/api/auth/';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  return { message: 'Logged out successfully' };
};
