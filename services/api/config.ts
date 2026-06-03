import Constants from "expo-constants";
export const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
// export const API_URL = `${SERVER_URL}/api`;

// export const AUTH_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_AUTH}`;
// export const CORE_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_CORE}`;
// export const SERVICE_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}:${process.env.EXPO_PUBLIC_PORT_SERVICE}`;

console.log("SERVER_URL", SERVER_URL);
// console.log("AUTH_URL", AUTH_URL);
// console.log("CORE_URL", CORE_URL);
// console.log("SERVICE_URL", SERVICE_URL);
