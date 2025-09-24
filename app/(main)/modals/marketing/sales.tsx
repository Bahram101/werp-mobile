// app/(main)/modals/marketing/sales.tsx
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function MarketingSales() {
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", gap:12 }}>
      <Text>Продажа (Marketing)</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
}
