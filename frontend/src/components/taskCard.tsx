import React from "react";

interface Task {
  id: number;
  title: string;
  status: string;
  dueDate: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="task-card">
      <h2 className="task-title">{task.title}</h2>
      <p><strong>Task ID:</strong> {task.id}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <button className="complete-btn">Mark as Complete</button>
    </div>
  );
};

export default TaskCard;
