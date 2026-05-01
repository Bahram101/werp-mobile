import { Accordion } from "@/components/ui/accordion";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { COLORS } from "@/constants/theme";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useAccountabilityRequestDetail } from "../../hooks/useAccountability";
import DocInfo from "./components/DocInfo";
import Table from "./components/Table";

type AccountabilityDetailParams = {
  id: string;
  regNumber: string;
};

const AccountabilityDetail = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<AccountabilityDetailParams>();
  const [refreshing, setRefreshing] = useState(false);
  const {
    accountabilityReqDetail,
    isLoadingAccReqDetail,
    refetchAccReqDetail,
  } = useAccountabilityRequestDetail(Number(id));

  useEffect(() => {
    if (accountabilityReqDetail?.regNumber) {
      navigation.setOptions({
        title: `Заказ №${accountabilityReqDetail.regNumber}`,
      });
    }
  }, [navigation, accountabilityReqDetail]);

  if (isLoadingAccReqDetail) {
    return <Loader />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchAccReqDetail();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Accordion
          type="multiple"
          defaultValue={["info"]}
          className="rounded-2xl gap-3 bg-transparent"
        >
          <DocInfo data={accountabilityReqDetail} />
        </Accordion>

        <View className="bg-white mt-3 rounded-2xl p-3 px-4">
          <View className=" py-3 pt-2 border-b mb-4 border-grayLight flex-row items-center">
            <ShoppingCart size={"22"} color={COLORS.primary} />
            <Text className="font-bold text-primary uppercase ml-4">
              Список материалов
            </Text>
          </View>
          <Table data={accountabilityReqDetail} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default AccountabilityDetail;
