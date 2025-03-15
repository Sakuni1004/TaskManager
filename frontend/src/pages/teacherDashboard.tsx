import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksByTeacher, deleteExistingTask } from "../slices/taskSlice";
import CreateTaskForm from "../components/createTaskForm";
import { AppDispatch } from '../store/store';
import { RootState } from "../store/store";
import Sidebar from "../components/sideBar";
import { useNavigate } from "react-router-dom";
import "./teacherDashbord.css";
import { TaskTable } from "../components/taskTable";

const TeacherDashboard: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
 
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const navigate = useNavigate();

  const teacherName = localStorage.getItem("Name");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "teacher") {
      setUserRole(role);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const teacherId = localStorage.getItem("id");
    if (teacherId) {
      dispatch(fetchTasksByTeacher(teacherId));
    }
  }, [dispatch, userRole]);

  const handleEdit = (task: any) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteExistingTask(taskId));
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div className="container">
      <Sidebar userRole={userRole} onLogout={logout} />

      <div className="dashboard-container">
        <h1 className="welcome">Welcome {teacherName}!</h1>
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
                  dispatch(fetchTasksByTeacher(localStorage.getItem("id") || ""));
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
