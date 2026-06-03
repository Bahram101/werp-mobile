import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Field } from "@/components/ui/input/Field";
import Layout from "@/components/ui/master/Layout";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreatePayment } from "@/features/master/requests/hooks/useService";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, View } from "react-native";

type QrPaymentParams = {
  sumForPay: string;
  method: "cash" | "cashless";
  isSplit: string;
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
  const { user } = useAuth();
  const { isSplit } = useLocalSearchParams<QrPaymentParams>();
  const masterId = user?.userInfo.currentStaff.staffId;

  const images: Record<number, any> = {
    806: require(`@/assets/images/806.jpeg`),
    5108: require(`@/assets/images/5108.jpeg`),
  };

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
    const dataForPayment = isSplit ? dataSplit : data;
    if (!dataForPayment) return;

    const payload = {
      ...dataForPayment,
      paymentParts: dataForPayment.paymentParts.map((item) =>
        item.paymentType === "CASHLESS"
          ? {
              ...item,
              paymentNumber: values.paymentNumber,
            }
          : item,
      ),
    };

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
            source={images[masterId]}
            resizeMode="contain"
            style={{ width: 250, height: 250 }}
          />
        </View>

        <Field
          placeholder="Номер оплаты"
          keyboardType="numeric"
          control={control}
          name="paymentNumber"
          rules={{
            required: "Поле обязательно",
          }}
        />

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
