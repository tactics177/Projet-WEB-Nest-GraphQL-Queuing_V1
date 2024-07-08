import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/apiService";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkTokenExpiration } from "../utils/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenExpiration(navigate);
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);
      const decodedToken: any = jwtDecode(data.access_token);
      const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000);
      setTimeout(() => {
        checkTokenExpiration(navigate);
      }, expiresIn * 1000);
      navigate("/conversations");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Invalid username or password");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      {loginError && <div className="alert alert-danger">{loginError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
