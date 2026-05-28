import { router } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export const usePreventBack = (route: string) => {
  useEffect(() => {
    const backAction = () => {
      router.replace(route as any);
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => subscription.remove();
  }, [route]);
};
