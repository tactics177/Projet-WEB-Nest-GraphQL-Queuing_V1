import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { register } from "../services/apiService";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, password);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.response && error.response.status === 400) {
        setRegisterError(
          "Username is already taken. Please choose another one."
        );
      } else {
        setRegisterError(
          "An error occurred during registration. Please try again."
        );
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      {registerError && (
        <div className="alert alert-danger">{registerError}</div>
      )}
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
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
