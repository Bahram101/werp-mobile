import Layout from "@/components/ui/main/Layout";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <Layout header={true}>
      <View className="gap-6">
        <Link href="/modal">Service</Link>
      </View>
    </Layout>
  );
}
