import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_URL}/health-check`);
    return response.data;
  } catch (error) {
    console.error("Error checking health:", error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
