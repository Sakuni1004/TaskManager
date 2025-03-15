import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../slices/authSlice";

import { AppDispatch ,RootState} from "../store/store";

import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();


  const { error, loading, successMessage, role } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    dispatch(loginUserAsync({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
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
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="sign-up-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


