import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function MessageDetail() {
  const { id } = useLocalSearchParams();

  console.log('id',id)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Детали сообщения #{id}
      </Text>
    </View>
  );
}
