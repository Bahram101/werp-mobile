import axios from "axios";
import { AUTH_URL } from "./config";

export const refreshInstance = axios.create({
  baseURL: AUTH_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic V0VSUDpwYXNzd29yZA==",
  },
});
