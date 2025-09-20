import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { UseFormReset } from "react-hook-form";

import { useAuth } from "./useAuth";

import { IAuthFormData } from "@/types/auth.interface";

import { AuthService } from "../services/auth.service";

export const useAuthMutations = (reset: UseFormReset<IAuthFormData>) => {
  const { setUser } = useAuth();

  const { mutate: loginSync, isPending: isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ username, password }: IAuthFormData) => {
      return AuthService.login(username, password);
    },
    onSuccess: (data) => {
      reset();
      setUser({
        user_full_name: data.user_full_name,
        user_id: data.user_id,
      });
    },
  });

  return useMemo(
    () => ({
      loginSync,
      isLoading
    }),
    [loginSync, isLoading]
  );
};
