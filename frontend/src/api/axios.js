import axios from 'axios';

// Get base URL from environment or default to localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple response interceptor to extract data and handle errors uniformly
apiClient.interceptors.response.use(
  (response) => {
    // Our backend returns { success, message, data }
    return response.data;
  },
  (error) => {
    // Extract the useful message from our standardized error response
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
