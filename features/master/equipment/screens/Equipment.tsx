import AnimatedButton from "@/components/ui/button/AnimatedButton";
import cn from "clsx";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

type Props = {};

const Equipment = (props: Props) => {
  const [pressed, setPressed] = useState(false);
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
        <View className="rounded-2xl bg-white">
          {equipments.map((item, index) => (
            <View
              key={item.id}
              className={cn(
                "border-grayLight p-4 flex-row justify-between items-center",
                equipments.length - 1 !== index && "border-b"
              )}
            >
              <View className="flex-col">
                <Text className="text-lg text-primary mb-1">
                  {item.name.toUpperCase()}
                </Text>
                <Text className="text-xs text-grayDark">
                  КОД ТОВАРА: ПМ-2531
                </Text>
              </View>
              <Text
                className={cn(
                  "text-lg",
                  Number(item.qty) < 5 ? "text-error-500" : ""
                )}
              >
                {item.qty} шт.
              </Text>
            </View>
          ))}
        </View>

        <AnimatedButton bg='primary'>
          <Text>Заказать запчасти</Text>
        </AnimatedButton>
      </ScrollView>
    </View>
  );
};

export default Equipment;
