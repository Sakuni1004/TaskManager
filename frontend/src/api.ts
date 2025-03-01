import axios from 'axios';
import  store  from './store';
import { RootState } from './store';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
});

// Add interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = (store.getState() as RootState).auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global API error responses here (optional)
    if (error.response && error.response.status === 401) {
      // You can trigger logout here if token is expired
    }
    return Promise.reject(error);
  }
);

export default api;
