import axios from 'axios';

const API_URL = '/api/classes/';

// Get all available classes
export const getClasses = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get details of a specific class
export const getClassDetails = async (classId) => {
  try {
    const response = await axios.get(`${API_URL}${classId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
