import { useAuth } from "@/features/auth/hooks/useAuth";
import { router } from "expo-router";
import { useCallback } from "react";

export const usePostPinNavigation = () => {
  const { user, setPinVerified } = useAuth();

  const navigateNext = useCallback(() => {
    setPinVerified(true);

    const roles: string[] =
      user?.userInfo?.currentStaff?.roles?.map((r: any) => r.name) || [];

    if (roles.includes("mobile-master")) {
      router.replace("/(apps)/master");
    } else {
      router.replace("/(hub)/(tabs)/home");
    }
  }, [setPinVerified, user]);

  return { navigateNext };
};
