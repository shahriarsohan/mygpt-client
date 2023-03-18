import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// TODO: Have to add axios.interceptors

export default authAxios;
