import React from "react";
import "./taskCard.css"; // Import CSS

interface Task {
  _id: string;
  title: string;
  description: string;
}

interface TaskCardProps {
  tasks: Task[];
}

const deleteTask = (taskId: string) => {
  console.log("Deleting task:", taskId);
};

const editTask = (taskId: string) => {
  console.log("Editing task:", taskId);
};

export const TaskCard: React.FC<TaskCardProps> = ({ tasks }) => {
  return (
    <div className="task-container">
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>

          <div className="task-buttons">
            <button className="edit-btn" onClick={() => editTask(task._id)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
