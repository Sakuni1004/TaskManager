import React, { useEffect, useState } from "react";
import { getTasksByTeacher } from "../services/taskService";
import { TaskTable } from "../components/taskTable";
import CreateTaskForm from "../components/createTaskForm";
import {deleteTask} from '../services/taskService';
import Sidebar from "../components/sideBar";
import { useNavigate } from "react-router-dom"; 
import "./teacherDashbord.css";


const TeacherDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null); 
  const [userRole, setUserRole] = useState(String);
  const navigate = useNavigate();


  const teacherName = localStorage.getItem("Name");
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "teacher") {
      setUserRole(role);  
    } 
  }, []);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const teacherId = localStorage.getItem("id");

        if (!teacherId) {
          console.error("No teacher ID found.");
          return;
        }

        console.log("Fetching tasks for teacher ID:", teacherId);

        const data = await getTasksByTeacher(teacherId);
        console.log("data", data);
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);


  const handleEdit = (task: any) => {
    console.log("Edit Task:", task);
    setCurrentTask(task); 
    setShowForm(true); 
  };

  const handleDelete = (taskId: String) => {
    console.log("nnnn",taskId);
    const deleteData = deleteTask(taskId);
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/"); 
  };


  return (
  
    <div className="container">
      
      <Sidebar userRole={userRole} onLogout={logout} />
        
      <div className="dashboard-container">
      <h1 className=" welcomeTeacher">Welcome {teacherName} ! </h1>
      <div>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <button onClick={() => setShowForm(true)} className="add-task-button">
        Create Task
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateTaskForm
              task={currentTask} 
              onClose={() => setShowForm(false)}
              onTaskCreated={() => {
                setShowForm(false);
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default TeacherDashboard;

