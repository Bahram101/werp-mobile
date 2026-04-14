import { strToLowerCaase } from "@/utils/helpers";
import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";
import { EquipmentDtoItem } from "../types";

export default function EquipmentItem({
  item,
  isLast,
}: {
  item: EquipmentDtoItem;
  isLast: boolean;
}) {
  return (
    <View
      className={cn(
        "border-grayLight p-4 flex-row justify-between items-center",
        isLast && "border-b",
      )}
    >
      <View className="flex-1 mr-2">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-lg text-primary mb-1"
        >
          {strToLowerCaase(item.matnrName)}
        </Text>

        <Text className="text-xs text-grayDark">
          КОД ТОВАРА: {item.matnrCode}
        </Text>
      </View>

      <Text className={cn("", Number(item.qty) < 5 ? "text-error-500" : "")}>
        {item.qty} шт.
      </Text>
    </View>
  );
}
