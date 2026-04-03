import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { ROUTES } from "@/constants/routes";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { useHistories } from "../../../hooks/useHistory";
import HistoryList from "./components/HistoryList";
type Params = {
  contractNumber?: string;
  appNumber?: string;
};
export default function HistoryListScreen() {
  const navigation = useNavigation();
  const { contractNumber, appNumber } = useLocalSearchParams<Params>();

  const contractNum = contractNumber ? Number(contractNumber) : undefined;

  const { historyList, isLoading } = useHistories(contractNum!);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Список истории обсл.`,
    });
  }, [navigation]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <View className="bg-white rounded-2xl p-4">
        <HistoryList
          data={historyList.data}
          onPressItem={(item) => {
            router.push({
              pathname: ROUTES.REQUEST_HISTORY_DETAIL,
              params: {
                appNumber: Number(appNumber),
                historyId: item.id,
              },
            });
          }}
        />
      </View>
    </Layout>
  );
}
