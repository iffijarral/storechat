import axios from "axios";

// Using localhost:8000 for local development
// This will be replaced by your Docker service name in production
const API_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
});

// This helper will save the JWT token after login
export const setAuthToken = (token: string) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};