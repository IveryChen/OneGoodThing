import { jwtDecode } from "jwt-decode";

export default function isTokenValid() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    // Decode the token
    const decodedToken = jwtDecode(token);

    // Check if token has expired
    // exp is in seconds, so multiply by 1000 to get milliseconds
    if (!decodedToken.exp) return false;

    const currentTime = Date.now() / 1000; // Convert to seconds
    const isValid = decodedToken.exp > currentTime;

    if (!isValid) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    return isValid;
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return false;
  }
}
