import * as SplashScreen from "expo-splash-screen";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

import { getAccessToken, getUserFromStorage } from "../services/auth.storage";

import { registerSetUser } from "../helpers/auth.helper-context";
import { AuthService } from "../services/auth.service";
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

        if (!accessToken) {
          setUser(null);
          return;
        }
        // await AuthService.logout();

        const storedUser = await getUserFromStorage();
        if (!storedUser) {
          setUser(null);
          return;
        }
        // загружаем roles
        const userInfo = await AuthService.getUserInfo();

        if (isMounted) {
          setUser({
            ...storedUser,
            userInfo,
            extraLoaded: true,
          });
        }
      } catch (e) {
        setUser(null);
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

  const logout = () => {
    AuthService.logout().then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ isInitialized, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
