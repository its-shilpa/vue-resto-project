import axios from "axios";

const API = axios.create({
  // Use local backend so changes persist to local db.json
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000"
});

export default API;