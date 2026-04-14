import React from "react";
import { View } from "react-native";
import { EquipmentDtoItem } from "../types";
import EquipmentItem from "./EquipmentItem";

export default function EquipmentList({ data }: { data: EquipmentDtoItem[] }) {
  return (
    <View className="rounded-2xl bg-white mb-3 ">
      {data?.map((item, index) => (
        <EquipmentItem
          key={item.matnr}
          item={item}
          isLast={data.length - 1 !== index}
        />
      ))}
    </View>
  );
}
