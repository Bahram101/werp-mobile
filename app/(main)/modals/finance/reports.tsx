// app/(main)/modals/finance/reports.tsx
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function FinanceReports() {
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", gap:12 }}>
      <Text>Отчеты (Finance)</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
}
