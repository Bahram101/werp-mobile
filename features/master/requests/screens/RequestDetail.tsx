import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { RequestDetailParams } from "../types";

export default function RequestDetailScreen() {
  const { id, number } = useLocalSearchParams<RequestDetailParams>();
  const navigation = useNavigation();

  useEffect(() => {
    if (number) {
      navigation.setOptions({
        headerTitle: `Заявка №${String(number)}`,
      });
    }
  }, [navigation, number]);

  return (
    <Layout>
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-gray-600 mt-2">ID: {id}</Text>
        <Text className="text-gray-600 mt-2">Номер заявки: {number}</Text>
      </View>
    </Layout>
  );
}
