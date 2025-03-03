import axios from "axios";
import store from "../store";
import { RootState } from "../store";
import { logout } from "../slices/authSlice"; 


const api = axios.create({
  baseURL:"http://localhost:5000/api/users", 
});


api.interceptors.request.use(
  (config) => {
    
    const token = (store.getState() as RootState).auth.token;
    
  
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
  
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
   
    if (error.response && error.response.status === 401) {
      
      store.dispatch(logout()); 
      alert("Your session has expired. Please log in again.");
      window.location.href = "/login"; 
    }

    
    return Promise.reject(error);
  }
);

export default api;
