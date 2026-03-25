import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useHistories } from "../../../hooks/useHistory";
type Params = {
  contractNumber?: string;
  appNumber?: string;
};
export default function HistoryListScreen() {
  const navigation = useNavigation();
  const { contractNumber } = useLocalSearchParams<Params>();

  const cn = contractNumber ? Number(contractNumber) : undefined;

  const { historyList, isLoading } = useHistories(cn!);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Список истории обсл.`,
    });
  }, [navigation]);

  console.log("historyList", historyList);

  return (
    <Layout>
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-lg font-bold mb-2">asdf</Text>
      </View>
    </Layout>
  );
}
