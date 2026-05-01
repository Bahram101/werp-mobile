// export const SERVER_URL = process.env.EXPO_PUBLIC_SERVER;
import Constants from "expo-constants";
export const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

// export const AUTH_URL = `${SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_AUTH}`;
// export const CORE_URL = `${SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_CORE}`;
// export const SERVICE_URL = `${SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_SERVICE}`;
// export const CALL_CENTER_URL = `${SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_CALL_CENTER}`;
// export const CRM_URL = `${SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_CRM}`;
