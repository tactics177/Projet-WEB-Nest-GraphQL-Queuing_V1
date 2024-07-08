import React, { useEffect, useState } from "react";
import { healthCheck } from "../services/apiService";

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const result = await healthCheck();
        setStatus(result);
      } catch (error) {
        setStatus("Error");
      }
    };

    checkHealth();
  }, []);

  return (
    <div>
      <h1>Health Check Status: {status}</h1>
    </div>
  );
};

export default HealthCheck;
