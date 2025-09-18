import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function MessageDetail() {
  const { id, title } = useLocalSearchParams();
  console.log(id, title)

  const navigation = useNavigation();

  useEffect(() => {
    if (title) {
      navigation.setOptions({ title }); 
    }
  }, [title]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Детали сообщения #{id}
      </Text>
    </View>
  );
}
