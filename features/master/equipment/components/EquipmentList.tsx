import React from "react";
import { View } from "react-native";
import { IEquipment } from "../types";
import EquipmentItem from "./EquipmentItem";

export default function EquipmentList({ data }: { data: IEquipment[] }) {
  return (
    <View>
      {data.map((item, index) => (
        <EquipmentItem key={item.id} data={data} item={item} index={index} />
      ))}
    </View>
  );
}
