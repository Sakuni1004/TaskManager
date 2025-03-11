import axios from "axios";
const API_URL = "http://localhost:5000"; 

export const getAllStudents = async (token?: string) => {
    try {
      const authToken = token || localStorage.getItem("authToken"); 
      if (!authToken) throw new Error("No authentication token provided");
      const response = await axios.get
      (`${API_URL}/allStudents/students`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching students: " );
    }
  };
