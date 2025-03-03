import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice"; 

import { Link } from "react-router-dom";
import "./login.css"; 

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-heading">Login</h1>
        <form className="form">
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
          <button type="submit" className="submit-button">Login</button>
        </form>
        <div className="sign-up-link">
          <p>
            Don't have an account?{" "}
            <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

