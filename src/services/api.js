import axios from "axios";

const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "https://vue-resto-project.onrender.com"
});

export default API;