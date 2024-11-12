import axios from 'axios';

const API_URL = '/api/users/';

// Get user profile by ID
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}profile/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Update user role (for admin)
export const updateUserRole = async (userId, roleData) => {
  try {
    const response = await axios.put(`${API_URL}role/${userId}`, roleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
