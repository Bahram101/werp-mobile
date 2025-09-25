import Banner from "@/components/ui/master/Banner";
import Layout from "@/components/ui/master/Layout";
import React from "react";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <Layout header>
      <View>
        <Banner/>
        <Text>Home page</Text>
      </View>
    </Layout>
  );
}
