import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

type CheckServiceResponse = {
  checkedPayload: {
    applicationNumber: string;
  };
};

const PaymentScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<CheckServiceResponse>([
    "check-service-result",
  ]);

  useEffect(() => {
    const appNumber = data?.checkedPayload?.applicationNumber;
    if (appNumber) {
      navigation.setOptions({
        title: `Заявка №${appNumber}`,
      });
    }
  }, [navigation, data]);

  console.log("paymentScreen", JSON.stringify(data, null, 2));

  return (
    <View>
      <Text>PaymentScreen</Text>
    </View>
  );
};

export default PaymentScreen;
