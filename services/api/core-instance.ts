import axios from "axios";
import { API_URL } from "./config";

export const coreInstance = axios.create({
  baseURL: `${API_URL}/core`,
});
