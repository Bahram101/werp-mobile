import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { UseFormReset } from "react-hook-form";

import { useAuth } from "./useAuth";

import { AuthFormData } from "@/types/auth.interface";

import { AuthService } from "../services/auth.service";

export const useAuthMutations = (reset: UseFormReset<AuthFormData>) => {
  const { setUser } = useAuth();

  const { mutate: loginSync, isPending: isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ username, password }: AuthFormData) => {
      return AuthService.login(username, password);
    },
    onSuccess: async (data) => {
      reset();
      const userInfo = await AuthService.getUserInfo();
      setUser({
        user_full_name: data.user_full_name,
        user_id: data.user_id,
        userInfo,
        extraLoaded: true,
      });
    },
  });

  return useMemo(
    () => ({
      loginSync,
      isLoading,
    }),
    [loginSync, isLoading],
  );
};
