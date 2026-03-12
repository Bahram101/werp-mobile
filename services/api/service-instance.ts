import axios from "axios";
import { API_URL } from "./config";

export const serviceInstance = axios.create({
  baseURL: `${API_URL}/service`,
});
