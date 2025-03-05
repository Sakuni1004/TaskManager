import React, { useEffect, useState } from "react";
import './taskTable.css';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
  }

  const deleteTask = (taskId: string) => {
    console.log("deleting task:", taskId);
    
  };

  const editTask = (taskId: string) => {
    console.log("Editing task:", taskId);
   
  };

  interface TaskTableProps {
    tasks: Task[]; 
  }
  

export   const TaskTable: React.FC <TaskTableProps>= ({ tasks }) => {
    
  
    return (
        <div className="container mx-auto p-4">
         
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Due Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border">
                  <td className="border p-2">{task._id}</td>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.description}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => editTask(task._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }