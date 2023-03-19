import axios from "axios";

const authAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_GOOGLE_API}/api/`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// TODO: Have to add axios.interceptors

export default authAxios;
