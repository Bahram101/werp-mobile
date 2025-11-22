import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ServiceItem } from "../../../types";
import ServiceTable from "./components/ServiceTable";

const RequestWorkScreen = () => {
  const { number } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (number) {
      navigation.setOptions({
        headerTitle: `Заявка №${String(number)}`,
      });
    }
  }, [navigation, number]);

  const services: ServiceItem[] = [
    { id: 1, name: "Установка", price: 7500, currency: "KZT" },
    { id: 2, name: "Услуга", price: 2500, currency: "KZT" },
    { id: 3, name: "Монтаж", price: 1500, currency: "KZT" },
    { id: 4, name: "Демонтаж", price: 1500, currency: "KZT" },
    { id: 5, name: "Профилактика", price: 3500, currency: "KZT" },
    { id: 6, name: "Ремонт товара", price: 5500, currency: "KZT" },
  ];

  return (
    <View className="flex-1">
      <View className="bg-white mt-3 rounded-2xl p-3 mx-4">
        <View className="flex-row items-center pb-4 pt-2 border-b mb-4 border-grayLight gap-2">
          <Text className="font-bold text-primary">УСЛУГИ</Text>
        </View>

        <ServiceTable data={services} />
      </View>
    </View>
  );
};

export default RequestWorkScreen;
