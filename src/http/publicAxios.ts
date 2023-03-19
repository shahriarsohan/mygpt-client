import axios from "axios";

const publixAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publixAxios;
