import React, { useState, useEffect } from "react";
import axios from "axios";
import { TaskCard } from "../components/taskCardStudent";
import './studentDashbord.css'

const StudentDashboard: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null)

  
useEffect(()=>{
  const storeName = localStorage.getItem("sName");
  setName(storeName);
})

  useEffect(() => {
    const fetchTasks = async () => {
      const studentId = localStorage.getItem("sId");
  

      if (!studentId) {
        setError("Student ID not found. Please log in again.");
        return;
      }

      try {
        const token = localStorage.getItem("authToken"); 
    
        const response = await axios.get(
          `http://localhost:5000/tasks/${studentId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []); 

  return (
    <div className="Container">
      <h1 className="studentDashbord">Hello {name}!! Here your tasks!</h1>

      {error && <p className="error-message">{error}</p>}

      {tasks.length > 0 ? (
        <TaskCard tasks={tasks} />
      ) : (
        <p>No tasks available for this student.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
