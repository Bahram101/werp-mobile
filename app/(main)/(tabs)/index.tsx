import Layout from "@/components/ui/main/Layout";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <Layout header={true}>
      <View className="gap-6">
        <Link href="/modals/service/tasks">Service</Link>

        <Link href="/modals/finance/reports">Finance</Link>

        <Link href="/modals/marketing/sales">Marketing</Link>
      </View>
    </Layout>
  );
}
