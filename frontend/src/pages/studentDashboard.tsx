import React, { useEffect, useState } from "react";
import { getTasksByStudent } from "../services/taskService";
import { TaskCard } from "../components/taskCardStudent"; 
import Sidebar from "../components/sideBar";
import { useNavigate } from "react-router-dom"; 
import './studentDashbord.css'


const StudentDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(String);
    const navigate = useNavigate();
  

  const studentName = localStorage.getItem("Name");
    
  useEffect(() => {
      const role = localStorage.getItem("userRole");
      if (role === "student" ) {
        setUserRole(role); 
       } 
     }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const studentId = localStorage.getItem("sId"); 
       
        
        if (!studentId) {
          console.error("No student ID found.");
          return;
        }
        const data = await getTasksByStudent(studentId);
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchTasks();
  }, []);

  

  const handleStatusUpdate = (updatedTask: any) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    console.log("Task Updated in UI:", updatedTask); 
  };

  const logout = () => {
    localStorage.clear();
    navigate("/"); 
  };

  

  return (
    <div className="container2">
      <div className="dashboard-container">
           <Sidebar userRole={userRole} onLogout={logout} />
      <h1 className="welcome">Welcome {studentName} ! Here Your Tasks..</h1>
      {loading ? <p>Loading tasks...</p> : <TaskCard tasks={tasks} onStatusUpdate={handleStatusUpdate}/>}
    </div>
    </div>
  );
};

export default StudentDashboard;
