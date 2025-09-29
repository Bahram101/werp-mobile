import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { RequestDetailParams } from "../types";

export default function RequestDetailScreen() {
  const { id, title } = useLocalSearchParams<RequestDetailParams>();

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-gray-600 mt-2">ID: {id}</Text>
        <Text className="text-gray-600 mt-2">Номер заявки: {title}</Text>
      </View>
    </ScrollView>
  );
}
