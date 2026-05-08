import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const QrPaymentScreen = () => {
  const navigation = useNavigation();
  const { sumForPay } = useLocalSearchParams();

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

  return (
    <View>
      <Text>QrPaymentScreen</Text>
      <Text>Sum for Pay: {sumForPay}</Text>
    </View>
  );
};

export default QrPaymentScreen;
