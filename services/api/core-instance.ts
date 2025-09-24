import axios from "axios";
import { CORE_URL } from "./config";

export const coreInstance = axios.create({
  baseURL: CORE_URL,
  headers: { "Content-Type": "application/json" },
});
