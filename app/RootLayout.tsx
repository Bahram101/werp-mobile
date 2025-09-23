import { Loader } from "@/components/ui/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useColorScheme } from "@/hooks/use-color-scheme";
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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationState = useRootNavigationState();
  const segments = useSegments();
  const { user, isInitialized } = useAuth();

  if (!isInitialized || !navigationState?.key) {
    return <Loader />;
  }

  if (!user && segments[0] !== "(auth)") {
    return <Redirect href="/(auth)/login" />;
  }

  if (user && segments[0] === "(auth)" && user?.user_id === 1) {
    return <Redirect href="/(main)/(main-tabs)" />;
  }

  if (user && segments[0] === "(auth)" && user?.user_id === 4957) {
    return <Redirect href="/(master)/(master-tabs)" />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
