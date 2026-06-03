import axios from "axios";
import { SERVER_URL } from "./config";

export const refreshInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic V0VSUDpwYXNzd29yZA==",
  },
});
