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

  const userInfo = {
    ...user,
    rids: [
      {
        id: 52,
        name: "Начальник отдела Маркетинг",
      },
      {
        id: 620,
        name: "mobile",
      },
      // {
      //   id: 622,
      //   name: "mobile-marketing",
      // },
      {
        id: 624,
        name: "mobile-master",
      },
    ],
  };

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    if (!user) {
      router.replace("/(auth)/login");
      return;
    }

    const roles = userInfo.rids.map((role) => role.name);
    const hasMobileAccess = roles.includes("mobile");

    if (!hasMobileAccess) {
      router.replace("/(auth)/no-access");
      return;
    }

    if (roles.includes("mobile-master")) {
      router.replace("/(apps)/master");
    } else {
      router.replace("/(hub)/(tabs)/home");
    }
  }, [isInitialized, navigationState?.key, user, userInfo.rids]);

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
