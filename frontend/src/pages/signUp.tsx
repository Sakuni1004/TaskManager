import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../slices/authSlice";
import { AppDispatch } from "../store/store";
import "./signUp.css";

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentRegistrationNumber, setStudentRegistrationNumber] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");


  const [errors, setErrors] = useState<{
    username: string;
    email: string;
    password: string;
    studentRegistrationNumber: string;
  }>({
    username: "",
    email: "",
    password: "",
    studentRegistrationNumber: "",
  });

  const { error, successMessage, loading } = useSelector(
    (state: any) => state.auth
  );


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

   
    setErrors({
      username: "",
      email: "",
      password: "",
      studentRegistrationNumber: "",
    });

    let valid = true;


    if (!username) {
      setErrors((prevState) => ({ ...prevState, username: "Username is required" }));
      valid = false;
    }

    if (!email) {
      setErrors((prevState) => ({ ...prevState, email: "Email is required" }));
      valid = false;
    } else {
  
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        setErrors((prevState) => ({ ...prevState, email: "Please enter a valid email address" }));
        valid = false;
      }
    }

    if (!password) {
      setErrors((prevState) => ({ ...prevState, password: "Password is required" }));
      valid = false;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrors((prevState) => ({
          ...prevState,
          password:
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character",
        }));
        valid = false;
      }
    }

    if (role === "student" && !studentRegistrationNumber) {
      setErrors((prevState) => ({
        ...prevState,
        studentRegistrationNumber: "Student registration number is required",
      }));
      valid = false;
    }

    
    if (valid) {
      dispatch(
        signUpUser({
          username,
          email,
          password,
          role,
          studentRegistrationNumber: role === "student" ? studentRegistrationNumber : undefined,
        }));
    }
  };

  React.useEffect(() => {
    if (successMessage) {
      alert("Signup successful!"); 
      window.location.reload(); 
      navigate("/"); 
    }
  }, [successMessage, navigate]);

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
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="form-input">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-input">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
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
              />
              {errors.studentRegistrationNumber && (
                <p className="error-message">{errors.studentRegistrationNumber}</p>
              )}
            </div>
          )}

          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
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
