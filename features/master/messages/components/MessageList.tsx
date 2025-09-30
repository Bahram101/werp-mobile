import { IDepartment } from "@/types/department.interface";
import React from "react";
import { View } from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList({ data }: { data: IDepartment[] }) {
  return (
    <View className="rounded-2xl bg-white">
      {data.map((item, index) => (
        <MessageItem key={item.id} data={data} item={item} index={index} />
      ))}
    </View>
  );
}
