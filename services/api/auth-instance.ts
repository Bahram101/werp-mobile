import axios from "axios";
import { PHP_URL } from "./config";

export const authInstance = axios.create({
  baseURL: PHP_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic V0VSUDpwYXNzd29yZA==",
  },
});
