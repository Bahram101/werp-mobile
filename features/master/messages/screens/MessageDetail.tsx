import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function MessageDetail() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (title) {
      navigation.setOptions({
        headerTitle: String(title),
        // headerBackTitleVisible: false,
        // headerBackButtonDisplayMode: "minimal",
      });
    }
  }, [navigation, title]);

  return (
    <Layout>
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-gray-600 mt-2">ID: {id}</Text>
        <Text className="text-gray-600 mt-2">Номер заявки: {title}</Text>
      </View>
    </Layout>
  );
}
