import Layout from "@/components/ui/main/Layout";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <Layout header={true}>
      <View className="">
        <TouchableOpacity className="mb-5" onPress={() => router.push("/(modals)")}>
          <Text>Service</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(modals)/finance/(tabs)/index")}>
          <Text>Finance</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
