import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { IRequestType } from "../types";

interface IRequestItem {
  request: IRequestType;
}

export default function RequestTypeItem({ request }: IRequestItem) {
  return (
    <View className="bg-white rounded-2xl mb-2 border-grayLight flex-row items-center justify-between py-4 px-3">
      <View className="flex-row items-center">
        <MaterialCommunityIcons
          className="mr-3"
          name={request.icon as any}
          size={24}
        />
        <Text className="ml-2">{request.title}</Text>
      </View>
      <Text>3 шт</Text>
    </View>
  );
}
