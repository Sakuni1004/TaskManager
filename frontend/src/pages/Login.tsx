import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/loginServices"; 
import './login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      const { message, role } = await loginUser(email, password); 

      if (role === "student") {
        navigate("/studentDashboard");
      } else if (role === "teacher") {
        navigate("/teacherDashboard");
      } else {
        setError("Invalid role received from server.");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleLogin}>
          <div className="form-input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>

        {/* Sign Up Link */}
        <div className="sign-up-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

