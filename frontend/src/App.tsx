import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import SignUp from './pages/signUp'
import "./index.css";
import TeacherDashboard from './pages/teacherDashboard';
import StudentDashboard from './pages/studentDashboard';
import ProtectedRoute from "./components/protectedRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />

        </Route>
        <Route element={<ProtectedRoute />}>
        <Route path="/studentDashboard" element={<StudentDashboard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
