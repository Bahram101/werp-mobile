import { IUser } from "./user.interface";

export type AuthFormData = {
  username: string;
  password: string;
};

export enum EnumSecureStore {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  PIN = "pin",
}

export enum EnumAsyncStorage {
  USER = "user",
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export type AuthResponse = ITokens & IUser;
