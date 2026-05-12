import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppButton from "@/components/ui/button/BaseButton";
import { Field } from "@/components/ui/input/Field";
import { Loader } from "@/components/ui/Loader";
import { useAuthMutations } from "@/features/auth/hooks/useAuthMutation";
import { AuthFormData } from "@/types/auth.interface";

const Auth = () => {
  const { control, reset, handleSubmit } = useForm<AuthFormData>({
    mode: "onChange",
    defaultValues: {
      username: "bolat.ab",
      password: "",
    },
  });
  const { loginSync, isLoading } = useAuthMutations(reset);

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    loginSync(data);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center justify-center bg-white px-4">
          <View className="w-10/12 max-w-md">
            {isLoading ? (
              <Loader />
            ) : (
              <View className="flex-col gap-3">
                <Text className="text-2xl text-center">Sign in</Text>

                <Field<AuthFormData>
                  className="rounded-3xl"
                  placeholder="Введите логин"
                  keyboardType="email-address"
                  control={control}
                  name="username"
                  rules={{
                    required: "Login is required!",
                    minLength: {
                      value: 3,
                      message: "Please enter at least 3 characters",
                    },
                  }}
                />

                <Field<AuthFormData>
                  className="rounded-3xl"
                  placeholder="Введите пароль"
                  control={control}
                  name="password"
                  secureTextEntry
                  rules={{
                    required: "Пароль обязателен!",
                    minLength: {
                      value: 6,
                      message: "Please enter at least 6 characters",
                    },
                  }}
                />

                <View className="items-center">
                  <AppButton
                    className="text-white rounded-3xl h-[45px] w-[150px]"
                    onPress={handleSubmit(onSubmit)}
                  >
                    Войти
                  </AppButton>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Auth;
