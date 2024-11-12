import axios from 'axios';

const API_URL = '/api/queries/';

// Submit a new query
export const submitQuery = async (queryData) => {
  try {
    const response = await axios.post(`${API_URL}submit`, queryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get all queries for a staff member
export const getStaffQueries = async () => {
  try {
    const response = await axios.get(`${API_URL}staff`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Respond to a query
export const respondToQuery = async (queryId, responseData) => {
  try {
    const response = await axios.post(`${API_URL}respond/${queryId}`, responseData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
