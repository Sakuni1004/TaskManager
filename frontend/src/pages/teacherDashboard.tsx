// TeacherDashboard.tsx
import React, { useState } from "react";
import { Button } from "@mui/material";
import CreateTaskForm from "../components/createTaskForm";
import './teacherDashbord.css';

const TeacherDashboard: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleSubmit = (task: { title: string; description: string; taskId: string; status: string }) => {
    
    console.log("Task Created:", task);
    setOpenForm(false); 
  };

  return (
    
      <div>
<h1 className="heading">Teacher Dashboard</h1>
      

    
      <Button
        variant="contained"
        color="primary"
        className="addButton"
        onClick={() => setOpenForm(true)}
        style={{
          position: 'fixed',  
          bottom: '20px',   
          right:'20px',  
          backgroundColor: 'blue', 
          padding: '10px 20px', 
          zIndex: 1000, 
        }}
      >
        Add Task
      </Button>

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
