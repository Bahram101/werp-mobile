import { Loader } from "@/components/ui/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Slot, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationState = useRootNavigationState();
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    if (!user) {
      router.replace("/(auth)/login");
      return;
    }

    if (!user?.extraLoaded || !user.currentStaff?.roles?.length) return;

    const roles =
      user?.currentStaff?.roles?.map((role: any) => role.name) ?? [];
    const hasMobileAccess = roles.includes("mobile");

    if (!hasMobileAccess) {
      Toast.show({
        type: "error",
        text1: "У вас нет доступа к мобильному приложению",
      });
      return;
    }

    if (roles.includes("mobile-master")) {
      router.replace("/(apps)/master");
    } else {
      router.replace("/(hub)");
    }
  }, [isInitialized, navigationState?.key, user]);

  if (!isInitialized || !navigationState?.key) {
    return <Loader />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <Toast />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
