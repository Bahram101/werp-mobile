import AnimatedButton from "@/components/ui/button/AnimatedButton";
import React from "react";
import { ScrollView, View } from "react-native";
import EquipmentList from "../components/EquipmentList";

type Props = {};

const Equipment = (props: Props) => {
  const equipments = [
    {
      id: 1,
      name: "ПОМПА",
      qty: "7",
    },
    {
      id: 2,
      name: "Кран чистой воды",
      qty: "13",
    },
    {
      id: 3,
      name: "Бак накопительный",
      qty: "4",
    },
    {
      id: 4,
      name: "Мембрана",
      qty: "28",
    },
    {
      id: 5,
      name: "Соединения и фитинги",
      qty: "1",
    },
    {
      id: 6,
      name: "Ключи для колб",
      qty: "67",
    },
    {
      id: 7,
      name: "Сливной хомут",
      qty: "34",
    },
    {
      id: 8,
      name: "Соединения и фитинги",
      qty: "1",
    },
    {
      id: 9,
      name: "Ключи для колб",
      qty: "67",
    },
    {
      id: 10,
      name: "Сливной хомут",
      qty: "34",
    },
  ];

  return (
    <View className="h-full px-4 pt-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        <View className="rounded-2xl bg-white mb-3">
          <EquipmentList data={equipments} />
        </View>

        <AnimatedButton bg="primary" bgPressed="primaryDark">
          Заказать запчасти
        </AnimatedButton>
      </ScrollView>
    </View>
  );
};

export default Equipment;
