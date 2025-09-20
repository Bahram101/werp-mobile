import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppButton from "@/components/ui/button/BaseButton";
import { Field } from "@/components/ui/input/Field";
import { Loader } from "@/components/ui/Loader";
import { useAuthMutations } from "@/features/auth/hooks/useAuthMutation";
import { IAuthFormData } from "@/types/auth.interface";

const Auth = () => {
  const { control, reset, handleSubmit } = useForm<IAuthFormData>({
    mode: "onChange",
    defaultValues: {
      username: "azamat",
      password: "Almaty2020",
    },
  });

  const { loginSync, isLoading } = useAuthMutations(reset);

  const onSubmit: SubmitHandler<IAuthFormData> = (data) => {
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
              <Loader/>
            ) : (
              <>
                <Text className="text-2xl text-center mb-4">Sign in</Text>

                <Field<IAuthFormData>
                  placeholder="Введите логин"
                  keyboardType="email-address"
                  control={control}
                  name="username"
                  rules={{ required: "Login is required!", minLength: {
                    value: 3,
                    message: "Please enter at least 3 characters"
                  } }}
                />

                <Field<IAuthFormData>
                  placeholder="Введите пароль"
                  control={control}
                  name="password"
                  secureTextEntry
                  rules={{
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Please enter at least 6 characters",
                    },
                  }}
                />

                <View className="items-center">
                  <AppButton
                    className="text-white rounded-3xl mt-4 h-[45px] w-[150px]"
                    onPress={handleSubmit(onSubmit)}
                  >
                    Войти
                  </AppButton>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Auth;
