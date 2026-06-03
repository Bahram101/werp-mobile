import { Accordion } from "@/components/ui/accordion";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/main/Layout";
import { COLORS } from "@/constants/theme";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useHistory } from "../../../hooks/useHistory";
import HistoryDocInfo from "./components/HistoryDocInfo";

const HistoryDetailScreen = () => {
  const navigation = useNavigation();
  const { serviceId } = useLocalSearchParams();
  const { history, isLoading } = useHistory(Number(serviceId));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `История`,
    });
  }, [navigation]);

  if (isLoading) {
    return <Loader />;
  }

  console.log("history", JSON.stringify(history, null, 2));

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Accordion
          type="multiple"
          defaultValue={["info"]}
          className="rounded-2xl gap-3 bg-transparent"
        >
          <HistoryDocInfo data={history} />
        </Accordion>

        <View className="bg-white mt-3 rounded-2xl p-3 px-4">
          <View className=" py-3 pt-2 border-b mb-4 border-grayLight flex-row items-center">
            <ShoppingCart size={"22"} color={COLORS.primary} />
            <Text className="font-bold text-primary uppercase ml-4">
              Список материалов
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HistoryDetailScreen;
