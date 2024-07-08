import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";

/**
 * Checks if the token stored in the local storage has expired.
 * If the token is expired, it removes the token and username from the local storage,
 * alerts the user about the expired session, and navigates to the login page.
 *
 * @param navigate - The function used for navigation.
 * @returns Returns true if the token is valid (not expired), otherwise returns false.
 */
export const checkTokenExpiration = (navigate: NavigateFunction) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Token is expired
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      alert("Session expired. Please log in again.");
      navigate("/login");
      return false;
    }
  }
  return true;
};
