import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      navigation.setOptions({
        headerTitle: "История",
      });
    }
  }, [navigation, id]);

  return (
    <Layout>
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-lg font-bold mb-2">История № {id}</Text>
      </View>
    </Layout>
  );
}
