import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
});
