import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksByStudent, updateExistingTaskStatus } from "../slices/taskSlice";
import { TaskCard } from "../components/taskCardStudent";
import { AppDispatch, RootState } from '../store/store';
import Sidebar from "../components/sideBar";
import { useNavigate } from "react-router-dom"; 
import './studentDashbord.css';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
}

const StudentDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState<string>("student");
    const tasks = useSelector((state: RootState) => state.tasks.tasks); 
    const [loading, setLoading] = useState(true);
    const studentName = localStorage.getItem("Name");

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role === "student") {
            setUserRole(role); 
        } else {
            navigate("/"); 
        }
    }, [navigate]);

    useEffect(() => {
        const fetchTasksFromAPI = async () => {
            try {
                const studentId = localStorage.getItem("sId");
                if (studentId) {
                    await dispatch(fetchTasksByStudent(studentId)); 
                }
            } catch (error) {
                console.error("Failed to load tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasksFromAPI();
    }, [dispatch]);

    
    const handleStatusUpdate = async (updatedTask: Task) => {
        try {
            
            await dispatch(updateExistingTaskStatus({
                taskId: updatedTask._id,
                status: updatedTask.status,
            }));
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/"); 
    };

    return (
        <div className="container2">
            <div className="dashboard-container">
                <Sidebar userRole={userRole} onLogout={logout} />
                <h1 className="welcome">Welcome {studentName} ! Here Your Tasks..</h1>
                {loading ? <p>Loading tasks...</p> : (
                    <TaskCard tasks={tasks} onStatusUpdate={handleStatusUpdate} />
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
