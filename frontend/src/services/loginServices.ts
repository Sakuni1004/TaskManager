import axios from "axios";
import { decodeToken } from "react-jwt";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("authToken", token);
    console.log(response.data);

 
    const decodedToken = decodeToken(token) as any;

    if (decodedToken) {
      localStorage.setItem("Name", decodedToken.name);
      localStorage.setItem("userRole", decodedToken.role);
      

      
      if (decodedToken.role === "student") {
        localStorage.setItem("sId", decodedToken._id); 
      } else if (decodedToken.role === "teacher") {
        localStorage.setItem("id", decodedToken._id); 
      }
    } else {
      console.error("Failed to decode token.");
    }

    return {
      message: response.data.message,
      role: response.data.role,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Invalid credentials.");
  }
};
