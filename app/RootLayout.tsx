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
  if (!user) {
    return "/(auth)/login";
  }

  if (!user.extraLoaded) {
    return null;
  }

  if (!user.userInfo?.currentStaff?.roles?.length) {
    Toast.show({
      type: "error",
      text1: "Не удалось загрузить роли пользователя",
    });
    return "/(auth)/no-access";
  }

  const roles = user.userInfo.currentStaff.roles.map((role: any) => role.name);

  if (!roles.includes("mobile")) {
    Toast.show({
      type: "error",
      text1: "У вас нет доступа к мобильному приложению",
    });
    return "/(auth)/no-access";
  }

  if (!roles.includes("mobile-master")) {
    return "/(auth)/no-access";
  }

  const pinCode = await getPinCode();
  if (!pinCode) {
    return "/(auth)/pin-setup";
  }

  if (!isPinVerified) {
    return "/(auth)/pin-unlock";
  }

  return "/(apps)/master";
};

export default function RootLayout() {
  const navigationState = useRootNavigationState();
  const { user, isInitialized, isPinVerified } = useAuth();
  const [hasResolvedRoute, setHasResolvedRoute] = useState(false);

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    determineRoute(user, isPinVerified).then((route) => {
      if (!route) return;

      router.replace(route);
      setHasResolvedRoute(true);
    });
    // isPinVerified intentionally excluded: pin-setup/pin-unlock already
    // navigate to master themselves once verified, re-running this on that
    // change alone would re-check getPinCode() and bounce back to pin-setup
    // right after a skip (no PIN was ever saved).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, navigationState?.key, user]);

  if (!isInitialized || !navigationState?.key || !hasResolvedRoute) {
    return <Loader />;
  }

  return (
    <>
      <Slot />
      {/* {!hasResolvedRoute && <Loader />} */}
      <Toast />
      <StatusBar style="auto" />
    </>
  );
}
