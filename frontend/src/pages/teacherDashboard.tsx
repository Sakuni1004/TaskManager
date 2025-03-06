import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CreateTaskForm from "../components/createTaskForm";
import axios from "axios";
import { TaskTable } from "../components/taskTable";

import "./teacherDashbord.css";

const TeacherDashboard: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [tasks, setTasks] = useState([]);
    const [name, setName] = useState<string | null>(null)
  
    
  useEffect(()=>{
    const storeName = localStorage.getItem("sName");
    setName(storeName);
  })
  

  
  const fetchTasks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/tasks/teacher/:teacherId", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (task: {
    title: string;
    description: string;
    dueDate: string;
    studentId: string;
    status: string;
  }) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/tasks/create",
        task,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Task Created:", response.data);
      setOpenForm(false);
      fetchTasks(); 
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      <h1 className="heading">Wellcome {name}!</h1>
      <Button
        variant="contained"
        color="primary"
        className="add-task-button"
        onClick={() => setOpenForm(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "12px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        Add Task
      </Button>

      {/* Pass tasks to TaskTable */}
      <TaskTable tasks={tasks} />

      {openForm && (
        <CreateTaskForm
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
