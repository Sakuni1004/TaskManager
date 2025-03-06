import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import "./login.css";
import { decodeToken } from "react-jwt";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const decodedTokenForStudentId = decodeToken(
        response.data.token
        
      ) as any;
      console.log("decode", decodedTokenForStudentId);

      setSuccessMessage(response.data.message);

    

      const token = response.data.token;
      localStorage.setItem("authToken", token);

      const id = decodedTokenForStudentId.id;
      localStorage.setItem("sId",id);

      const name = decodedTokenForStudentId.name;
      localStorage.setItem("sName",name);


      const userRole = response.data.role;
      console.log("user", userRole);

      

      if (userRole === "teacher") {
        window.location.href = "/teacherDashboard";
      } else {
        window.location.href = "/studentDashboard";
      }
    } catch (error: any) {
      console.error("Error logging in:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-heading">Login to Task Manager</h1>
        <form onSubmit={handleLogin} className="form">
          <div className="form-input">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
