import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  Redirect,
  Slot,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Loader } from "@/components/ui/Loader";
import "@/global.css";
import { useEffect, useState } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationState = useRootNavigationState();
  const segments = useSegments();
  const [user, setUser] = useState<null | boolean>(null);

  useEffect(() => {
    setUser(true);
  }, []);

  if (user === null || !navigationState?.key) {
    return <Loader />;
  }
  
  if (!user && segments[0] !== "(auth)") {
    return <Redirect href="/(auth)/login" />;
  }

  if (user && segments[0] === "(auth)") {
    return <Redirect href="/(main)/(tabs)" />;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
