import axios from 'axios';

const API_URL = '/api/blogs/';

// Create a new blog post
export const createBlogPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}create`, postData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get all blog posts
export const getBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
