import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HistoryListScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Список истории обсл.`,
    });
  }, [navigation]);

  return (
    <Layout>
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-lg font-bold mb-2">История №</Text>
      </View>
    </Layout>
  );
}
