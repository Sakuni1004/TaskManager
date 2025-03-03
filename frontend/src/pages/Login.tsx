import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice"; // Corrected import
import api from "../services/api";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      dispatch(login(token)); // Dispatch the correct action to store the token
      // Redirect to Dashboard or home here (optional)
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
