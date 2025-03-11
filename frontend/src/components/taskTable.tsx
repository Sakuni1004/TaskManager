
import React from "react";
import './taskTable.css';

interface Task {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  _id: string;
}

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: String) => void; 
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ fontSize: "20px", textAlign:'center' }}>Title</th>
          <th style={{ fontSize: "20px", textAlign:'center' }}>Description</th>
          <th style={{ fontSize: "20px", textAlign:'center' }}>Due Date</th>
          <th style={{ fontSize: "20px", textAlign:'center' }}>Status</th>
          <th style={{ fontSize: "20px", textAlign:'center' }}>Actions</th> 
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td style={{ fontWeight: "500" }}>{task.title}</td>
            <td style={{  fontSize: "14px" }}>{task.description}</td>
            <td style={{  textAlign:'center', fontSize: "14px" }}>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td style={{  textAlign:'center', fontSize: "14px" }}>{task.status}</td>
            <td style={{  textAlign:'center', fontSize: "14px" }}>
              <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>
              <button className="delete-button" onClick={() => onDelete(task._id)}>Delete</button>
            </td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
};
