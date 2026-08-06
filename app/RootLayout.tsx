import { Loader } from "@/components/ui/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getPinCode } from "@/features/auth/utils/pinStore";
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
  const { user, isInitialized, isPinVerified } = useAuth();

  // removePinCode();

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    const resolveRoute = async () => {
      if (!user) {
        router.replace("/(auth)/login");
        return;
      }

      if (!user?.extraLoaded || !user.userInfo?.currentStaff?.roles?.length)
        return;

      const roles =
        user?.userInfo?.currentStaff?.roles?.map((role: any) => role.name) ??
        [];
      const hasMobileAccess = roles.includes("mobile");

      if (!hasMobileAccess) {
        Toast.show({
          type: "error",
          text1: "У вас нет доступа к мобильному приложению",
        });
        router.replace("/(auth)/no-access");
        return;
      }

      if (!roles.includes("mobile-master")) {
        router.replace("/(auth)/no-access");
        return;
      }

      const pinCode = await getPinCode();
      if (!pinCode) {
        router.replace("/(auth)/pin-setup");
        return;
      }

      if (!isPinVerified) {
        router.replace("/(auth)/pin-unlock");
        return;
      }

      router.replace("/(apps)/master");
    };

    resolveRoute();
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
