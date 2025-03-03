import React, { useState } from "react";
import api from "../services/api"; 
import { Link } from "react-router-dom";

import "./signUp.css"; 

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users", {
        username,
        email,
        password,
        role,
      });
      console.log("User created successfully:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-heading">Sign Up to Task Manager</h1>
        <form onSubmit={handleSignUp} className="form">
          <div className="form-input">
            <input
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-input">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-input">
            <select
              className="inputRole"
              value={role}
              onChange={(e) => setRole(e.target.value as "student" | "teacher")}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
