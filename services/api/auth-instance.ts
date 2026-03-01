import axios from "axios";
import { SERVER } from "./config";

export const authInstance = axios.create({
  baseURL: SERVER,
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Authorization: "Basic V0VSUDpwYXNzd29yZA==",
  // },
});
