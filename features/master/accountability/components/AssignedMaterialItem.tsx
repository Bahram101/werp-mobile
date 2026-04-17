import { strToLowerCase } from "@/utils/helpers";
import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";
import { AssignedMaterialDto } from "../types";

export default function AssignedMaterialItem({
  item,
  isFirst,
  isLast,
}: {
  item: AssignedMaterialDto;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <View
      className={cn(
        "border-grayLight p-4 flex-row justify-between items-center bg-white",
        // isFirst && "rounded-tl-md rounded-tr-md",
        isLast && "border-b",
      )}
    >
      <View className="flex-1 mr-2">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-lg text-primary mb-1"
        >
          {strToLowerCase(item.name)}
        </Text>

        <Text className=" text-grayDark ">КОД ТОВАРА: {item.code}</Text>
      </View>

      <View className="ml-3">
        <Text
          className={cn(
            "",
            Number(item.quantity) < 5
              ? "text-error-500 font-bold"
              : "font-bold",
          )}
        >
          {item.quantity} шт.
        </Text>
        <Text className="text-grayDark">{item.limit} лм.</Text>
      </View>
    </View>
  );
}
