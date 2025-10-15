export const SERVER = process.env.EXPO_PUBLIC_SERVER;

export const AUTH_URL = `${SERVER}:${process.env.EXPO_PUBLIC_PORT_AUTH}`;
export const CORE_URL = `${SERVER}:${process.env.EXPO_PUBLIC_PORT_CORE}`;
export const SERVICE_URL = `${SERVER}:${process.env.EXPO_PUBLIC_PORT_SERVICE}`;
export const CALL_CENTER_URL = `${SERVER}:${process.env.EXPO_PUBLIC_PORT_CALL_CENTER}`;
export const CRM_URL = `${SERVER}:${process.env.EXPO_PUBLIC_PORT_CRM}`;
export const PHP_URL = `${SERVER}:${process.env.EXPO_PUBLIC_PORT_PHP}`;
// console.log('SERVER',SERVER)
console.log('PHP_URL',PHP_URL)
