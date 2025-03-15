import axios from "axios";

const API_URL = "http://localhost:5000/auth/signup"; 
export const signUpUserService = async (
  username: string,
  email: string,
  password: string,
  role: "student" | "teacher",
  studentRegistrationNumber?: string
) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      email,
      password,
      role,
      studentRegistrationNumber: role === "student" ? studentRegistrationNumber : undefined
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};
