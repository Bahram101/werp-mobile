import { strToLowerCaase } from "@/utils/helpers";
import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";
import { EquipmentDto } from "../types";

export default function EquipmentItem({
  item,
  isLast,
}: {
  item: EquipmentDto;
  isLast: boolean;
}) {
  return (
    <View
      className={cn(
        "border-grayLight p-4 flex-row justify-between items-center bg-white",
        isLast && "border-b",
      )}
    >
      <View className="flex-1 mr-2">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-lg text-primary mb-1"
        >
          {strToLowerCaase(item.name)}
        </Text>

        <Text className="text-xs text-grayDark">КОД ТОВАРА: {item.code}</Text>
      </View>

      <Text
        className={cn("", Number(item.quantity) < 5 ? "text-error-500" : "")}
      >
        {item.quantity} шт.
      </Text>
    </View>
  );
}
