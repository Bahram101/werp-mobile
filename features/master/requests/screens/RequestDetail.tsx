import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { RequestDetailParams } from "../types";

export default function RequestDetailScreen() {
  const { id, title } = useLocalSearchParams<RequestDetailParams>();

  return (
    <Layout>
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-gray-600 mt-2">ID: {id}</Text>
        <Text className="text-gray-600 mt-2">Номер заявки: {title}</Text>
      </View>
    </Layout>
  );
}
