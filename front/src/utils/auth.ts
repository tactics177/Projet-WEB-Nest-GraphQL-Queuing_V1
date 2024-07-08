import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from 'react-router-dom';

export const checkTokenExpiration = (navigate: NavigateFunction) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Token is expired
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      alert('Session expired. Please log in again.');
      navigate('/login');
      return false;
    }
  }
  return true;
};
