import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To redirect after signup
import { signUpUser } from "../services/signupServices"; // Your service file to handle the API call
import './signUp.css';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentRegistrationNumber, setStudentRegistrationNumber] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      
      const response = await signUpUser(
        username,
        email,
        password,
        role,
        role === "student" ? studentRegistrationNumber : undefined // Only send the studentRegistrationNumber for students
      );

     
      setSuccessMessage("Signup successful!");
      navigate("/"); 
    } catch (error: any) {
     
      setErrorMessage(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-heading">Sign Up</h1>
        <form onSubmit={handleSignUp} className="form">
          <div className="form-input">
            <input
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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



          <div className="form-input">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "student" | "teacher")}
              className="inputOption"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {role === "student" && (
            <div className="form-input">
              <input
                type="text"
                className="input"
                placeholder="Student Registration Number"
                value={studentRegistrationNumber}
                onChange={(e) => setStudentRegistrationNumber(e.target.value)}
                required
              />
            </div>
          )}

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account? <a href="/">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
