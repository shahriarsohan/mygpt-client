import axios from "axios";

const publixAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_GOOGLE_API}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publixAxios;
