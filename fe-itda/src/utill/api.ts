import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true, // <--- 반드시 추가
});

export default api;
