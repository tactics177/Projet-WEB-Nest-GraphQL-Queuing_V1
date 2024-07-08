import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkTokenExpiration } from "../utils/auth";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenExpiration(navigate);
  }, [navigate]);

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
