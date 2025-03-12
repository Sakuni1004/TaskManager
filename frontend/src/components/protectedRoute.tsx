import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const userRole = localStorage.getItem("userRole"); 
  const teacherId = localStorage.getItem("id");
  const studentId = localStorage.getItem("sId"); 


  if ((userRole === "teacher" && teacherId) || (userRole === "student" && studentId)) {
    return <Outlet />; 
  }

  return <Navigate to="/" replace />; 
};

export default ProtectedRoute;
