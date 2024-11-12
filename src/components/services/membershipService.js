import axios from 'axios';

const API_URL = '/api/memberships/';

// Get all membership plans
export const getMembershipPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Purchase a membership plan
export const purchaseMembership = async (membershipData) => {
  try {
    const response = await axios.post(`${API_URL}purchase`, membershipData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
