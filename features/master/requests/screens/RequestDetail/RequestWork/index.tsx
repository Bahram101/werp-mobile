import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { PartItem, ServiceItem } from "../../../types";
import ServiceTable from "./components/Services/ServiceTable";
import SparePartsSaleTable from "./components/SpareParts/SparePartsSaleTable";

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

  const parts: PartItem[] =[
  { id: 1, serialNumber: "341133Z", name: "Таблетка антипотопа", price: 1200 },
  { id: 2, serialNumber: "341074Z", name: "Прибор контролирующий течение", price: 18500 },
  { id: 3, serialNumber: "340029Z", name: "Насосная часть помпы в комплекте", price: 14500 },
  { id: 4, serialNumber: "340003Z01", name: "Корпус мембраны в комплекте", price: 9800 },
  { id: 5, serialNumber: "340006Z01", name: "Автоматическая затворка", price: 7200 },
  { id: 6, serialNumber: "340008Z01", name: "Кран, короткий, 75 мм", price: 2500 },
  { id: 7, serialNumber: "349093Z", name: "Сверло Ø20, для металла", price: 1600 },
  { id: 8, serialNumber: "349095Z", name: "Сверло корончатое по граниту, мрамору", price: 3500 },
  { id: 9, serialNumber: "341003Z", name: "Пластиковый клапан резервуара", price: 1100 },
  { id: 10, serialNumber: "346003Z", name: "Помпа", price: 22000 },
  { id: 11, serialNumber: "356004Z", name: "Электромагнитный клапан", price: 7800 },
  { id: 12, serialNumber: "345001Z", name: "Белый шланг", price: 900 }
];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View className="flex-1">
        <View className="bg-white mt-3 rounded-2xl p-3 mx-4">
          <View className="pb-4 pt-2 border-b mb-4 border-grayLight ">
            <Text className="font-bold text-primary uppercase">Услуги</Text>
          </View>
          <ServiceTable data={services} />
        </View>

        <View className="bg-white mt-3 rounded-2xl p-3 mx-4">
          <View className="pb-4 pt-2 border-b mb-4 border-grayLight gap-2">
            <Text className="font-bold text-primary uppercase">
              Продажа запчастей
            </Text>
          </View>
          <SparePartsSaleTable data={parts} />
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestWorkScreen;
