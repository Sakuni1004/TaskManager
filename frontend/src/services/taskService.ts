import axios from "axios";

const API_URL = "http://localhost:5000"; 

//create
export const createTask = async (taskData: any) => {
  const token = localStorage.getItem("authToken");
  const teacherId = localStorage.getItem("id");


  if (!token) throw new Error("No token found. Please log in.");
  if (!teacherId ) {
    console.error("Teacher ID not found in localStorage");
    throw new Error("Teacher ID is missing");
  }

 
  const updatedTaskData = {
    ...taskData,
    teacherId: teacherId || "", 
    
  };

  try {
    const response = await axios.post(`${API_URL}/tasks/create`, updatedTaskData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating task:", error.response?.data || error.message);
    throw error;
  }
};


// get tasks by student
export const getTasksByStudent = async (studentId: string) => {
  const token = localStorage.getItem("authToken");
  
  if (!token) throw new Error("No token found. Please log in.");

  try {
    const response = await axios.get(`${API_URL}/tasks/student/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching student tasks:", error);
    throw error;
  }
};


// get tasks by teacher
export const getTasksByTeacher = async (teacherId: string) => {
    try {

      console.log("Teacher ID:", teacherId);
      
      const token = localStorage.getItem("authToken"); 
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",token)
      if (!token) {
        console.error("Token not found.");
        return;
      }
  
      const response = await axios.get(`${API_URL}/tasks/teacher/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      console.log("Fetched tasks response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };
  

  //update task by task id
  export const updateTask = async (taskId: string, taskData: any, token?: string) => {
    try {
      const authToken = token || localStorage.getItem("authToken"); 
      if (!authToken) throw new Error("No authentication token provided");
  
      const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Error updating task");
    }
  };



  //update task status
  export const updateTaskStatus = async (taskId: string, status: string, token?: string) => {
    try {
      const authToken = token || localStorage.getItem("authToken"); 
      if (!authToken) throw new Error("No authentication token provided");
  
      const response = await axios.put(
        `${API_URL}/tasks/status/${taskId}`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Task status updated:", response);
      return response.data;
    } catch (error: any) {
      console.error("Error updating task status:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to update task status");
    }
  };
  
  


  //delete the task
  export const deleteTask = async (taskId: String, token?: string) => {
    try {
      const authToken = token || localStorage.getItem("authToken"); 
      if (!authToken) throw new Error("No authentication token provided");

      const response = await axios.delete
      (`${API_URL}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error deleting task: " );
    }
  };
  