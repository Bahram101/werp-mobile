import { Loader } from "@/components/ui/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { TypeUserState } from "@/features/auth/types/auth-provider.interface";
import { getPinCode } from "@/features/auth/utils/pinStore";
import { Href, router, Slot, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const determineRoute = async (
  user: TypeUserState,
  isPinVerified: boolean,
): Promise<Href | null> => {
  if (!user) return "/(auth)/login";
  if (!user.extraLoaded) return null;

  const roles =
    user.userInfo?.currentStaff?.roles?.map((role: any) => role.name) || [];

  if (!roles.includes("mobile")) {
    Toast.show({
      type: "error",
      text1: "У вас нет доступа к мобильному приложению",
    });
    return "/(auth)/no-access";
  }

  const pinCode = await getPinCode();
  if (!pinCode) return "/(auth)/pin-setup";
  if (!isPinVerified) return "/(auth)/pin-unlock";

  if (roles.includes("mobile-master")) {
    return "/(apps)/master";
  }

  return "/(hub)/(tabs)/home";
};

export default function RootLayout() {
  const navigationState = useRootNavigationState();
  const { user, isInitialized, isPinVerified } = useAuth();
  const [hasResolvedRoute, setHasResolvedRoute] = useState(false);

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    let isMounted = true;

    determineRoute(user, isPinVerified).then((route) => {
      if (!isMounted || !route) return;

      router.replace(route);
      setHasResolvedRoute(true);
    });

    return () => {
      isMounted = false;
    };
  }, [isInitialized, navigationState?.key, user]);

  if (!isInitialized || !navigationState?.key || !hasResolvedRoute) {
    return (
      <>
        <Loader />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      <Slot />
      <Toast />
      <StatusBar style="auto" />
    </>
  );
}
