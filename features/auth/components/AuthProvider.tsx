import * as SplashScreen from "expo-splash-screen";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

import { getAccessToken, getUserFromStorage } from "../services/auth.storage";
// import { registerSetUser } from '@/services/auth/auth.helper-context'

import { registerSetUser } from "../helpers/auth.helper-context";
import { IContext, TypeUserState } from "../types/auth-provider.interface";

export const AuthContext = createContext({} as IContext);

SplashScreen.preventAutoHideAsync();

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<TypeUserState>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          try {
            const storedUser = await getUserFromStorage(); 
            if (isMounted) setUser(storedUser);
          } catch (e) {}
        } else {
          setUser(null);
        }
      } finally {
        setIsInitialized(true);
        await SplashScreen.hideAsync();
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    registerSetUser(setUser);
  }, []);

  console.log("user", user);

  return (
    <AuthContext.Provider value={{ isInitialized, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
