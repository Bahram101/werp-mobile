import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Field } from "@/components/ui/input/Field";
import Layout from "@/components/ui/master/Layout";
import { ROUTES } from "@/constants/routes";
import { useCreatePayment } from "@/features/master/requests/hooks/useService";
import { useQueryClient } from "@tanstack/react-query";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, View } from "react-native";

type QrPaymentParams = {
  sumForPay: string;
  method: "cash" | "cashless";
};

type CheckServiceResponse = {
  paymentParts: {
    amount: number;
    hkont: number;
    paymentType: string;
    paymentNumber: string;
    date: string;
  }[];
};

const QrPaymentScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<CheckServiceResponse>(["qr-payment"]);
  const dataSplit = queryClient.getQueryData<CheckServiceResponse>([
    "qr-payment-split",
  ]);
  const { createPaymentAsync, isPaymentLoading } = useCreatePayment();
  const { control, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      paymentNumber: "",
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

  const onSubmit = async (values: { paymentNumber: string }) => {
    console.log("values", values);
    console.log("QR_Data_Split", JSON.stringify(dataSplit, null, 2));
    if (!dataSplit) return;

    const payload = {
      ...dataSplit,
      paymentParts: dataSplit.paymentParts.map((item) =>
        item.paymentType === "CASHLESS"
          ? {
              ...item,
              paymentNumber: values.paymentNumber,
            }
          : item,
      ),
    };
    console.log("QR_PAYLOAD", JSON.stringify(payload, null, 2));

    try {
      await createPaymentAsync(payload);
      router.push({
        pathname: ROUTES.PAYMENT_SUCCESS,
      });
      reset();
    } catch (e: any) {
      Alert.alert("Ошибка", e.message);
    }
  };

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
            placeholder="Номер оплаты"
            keyboardType="email-address"
            control={control}
            name="paymentNumber"
            rules={{
              required: "Поле обязательно",
            }}
          />
        </View>

        <View className="flex-1">
          <AnimatedButton
            className="h-14"
            bg="primary"
            bgPressed="primaryDark"
            textColor="white"
            isLoading={isPaymentLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Подтвердить
          </AnimatedButton>
        </View>
      </View>
    </Layout>
  );
};

export default QrPaymentScreen;
