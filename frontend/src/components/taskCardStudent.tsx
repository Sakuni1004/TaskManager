import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateExistingTaskStatus } from "../slices/taskSlice";
import { AppDispatch } from '../store/store';

import "./taskCard.css";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskCardProps {
  tasks: Task[];
  onStatusUpdate: (updatedTask: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ tasks, onStatusUpdate }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const editTask = (task: Task) => {
    setSelectedTask(task);
    setNewStatus(task.status);
  };

  const handleStatusUpdate = async () => {
    if (!selectedTask) return;
  
    setLoading(true);
    try {
      const updatedTask = await dispatch(updateExistingTaskStatus({
        taskId: selectedTask._id,  // taskId
        status: newStatus          // newStatus
      }));
  
      if (updatedTask.payload) {
        onStatusUpdate(updatedTask.payload);  // Ensure the parent receives the updated task
        setSelectedTask(null); // Close the modal
        console.log("dffffdffdf",updatedTask.payload);
      } else {
        console.warn("Unexpected response format:", updatedTask);
      }
    } catch (error: any) {
      console.error("Error updating task status:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-card-container">
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div className="task-content">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-status"><strong>Status:</strong> {task.status}</p>
          </div>

          <div className="task-actions">
            <button className="edit-btn" onClick={() => editTask(task)}>Edit Status</button>
          </div>
        </div>
      ))}

      {selectedTask && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedTask(null)}></div>
          <div className="modal">
            <div className="modal-Content">
              <h3>Edit Task Status</h3>
              <p className="task-title-modal">{selectedTask.title}</p>

              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-dropdown"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="modal-actions">
                <button className="update-btn" onClick={handleStatusUpdate} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
                <button className="cancel-btn" onClick={() => setSelectedTask(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


