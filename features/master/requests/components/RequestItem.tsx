import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { IRequest } from "../types";

interface IRequestItem {
  request: IRequest;
}

export default function RequestItem({ request }: IRequestItem) {
  return (
    <View className="p-5 bg-white rounded-2xl mb-2 border-grayLight flex-row items-center justify-between">
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
