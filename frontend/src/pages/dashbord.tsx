import NavBar from "../components/sideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "teacher" | "student" | "";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  return (
    <div className="flex">
      {/* Left Sidebar */}
   

      {/* Main Content Area */}
      <div className="flex-1 p-5 ml-64 bg-gray-100 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
