import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// token 
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const login = (email, password) => API.post("/auth/login", { emailOrusername: email, password });
const register = (userData) => API.post("/auth/register", userData);

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")); 
  } catch {
    return null;
  }
};

export default{ API, login, register, logout, getCurrentUser };
