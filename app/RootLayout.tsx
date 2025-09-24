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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationState = useRootNavigationState();
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.user_id === 4957) {
      router.replace("/(master)/(tabs)");
    } else if (user.user_id === 1) {
      router.replace("/(main)/(tabs)");
    }
  }, [isInitialized, navigationState?.key, user]);

  if (!isInitialized || !navigationState?.key) {
    return <Loader />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
