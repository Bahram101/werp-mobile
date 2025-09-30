import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";
import { IEquipment } from "../types";

export default function EquipmentItem({
  item,
  data,
  index,
}: {
  item: IEquipment;
  data: IEquipment[];
  index: number;
}) {
  return (
    <View
      className={cn(
        "border-grayLight p-4 flex-row justify-between items-center",
        data.length - 1 !== index && "border-b"
      )}
    >
      <View className="flex-col">
        <Text className="text-lg text-primary mb-1">
          {item.name.toUpperCase()}
        </Text>
        <Text className="text-xs text-grayDark">КОД ТОВАРА: ПМ-2531</Text>
      </View>
      <Text
        className={cn("text-lg", Number(item.qty) < 5 ? "text-error-500" : "")}
      >
        {item.qty} шт.
      </Text>
    </View>
  );
}
