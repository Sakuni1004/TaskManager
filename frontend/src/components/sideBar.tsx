import React from "react";
import { Link } from "react-router-dom";
import './sideBar.css';
;
interface SidebarProps {
  userRole: String;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {userRole === "teacher" && (
          <>
            <Link to="/teacherDashboard">Teacher Dashboard</Link>
          </>
        )}

        {userRole === "student" && (
          <>
            <Link to="/studentDashboard">Student Dashboard</Link>
          </>
        )}

        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
