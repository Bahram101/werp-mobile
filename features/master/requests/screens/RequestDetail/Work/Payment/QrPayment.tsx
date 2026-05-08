import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Field } from "@/components/ui/input/Field";
import Layout from "@/components/ui/master/Layout";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Image, View } from "react-native";

const QrPaymentScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { sumForPay } = useLocalSearchParams();
  const data = queryClient.getQueryData(["qr-payment"]);
  const { control, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "bolat.ab",
      password: "",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: "QR оплата",
    });

    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  console.log("qr-payment data", JSON.stringify(data, null, 2));

  return (
    <Layout className="bg-white justify-center items-center rounded-lg py-10">
      <View className="flex-col gap-6 w-full p-4">
        <View className="flex-row justify-center items-center">
          <Image
            source={require("@/assets/images/qr-code.png")}
            resizeMode="contain"
            style={{ width: 250, height: 250 }}
          />
        </View>

        <View className="">
          <Field
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
        </View>

        <View className="flex-1">
          <AnimatedButton
            className="h-14"
            bg="primary"
            bgPressed="primaryDark"
            textColor="white"
            // isLoading={isPaymentLoading}
            // onPress={handlePay}
          >
            Подтвердить
          </AnimatedButton>
        </View>
      </View>
    </Layout>
  );
};

export default QrPaymentScreen;
