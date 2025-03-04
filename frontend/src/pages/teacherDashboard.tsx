import React, { useState } from "react";
import { Button } from "@mui/material";
import CreateTaskForm from "../components/createTaskForm";
import axios from "axios";
import TaskCardList from '../components/taskCardTeacher';
import "./teacherDashbord.css";

const TeacherDashboard: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);

  
    const [tasks, setTasks] = useState([
      {
        id: "1",
        title: "Complete homework",
        description: "Finish math homework",
        status: "Pending",
      },

    
 
    ]);

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
        "http://localhost:5000/auth/tasks/create",
        task,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Task Created:", response.data);
      setOpenForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEditTask = (updatedTask: { id: string; title: string; description: string; status: string }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
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

      {tasks.map((task) => (
          <TaskCardList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      ))}

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
