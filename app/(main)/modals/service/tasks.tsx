// app/(main)/modals/service/tasks.tsx
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ServiceTasks() {
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", gap:12 }}>
      <Text>Задачи (Service)</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
}
