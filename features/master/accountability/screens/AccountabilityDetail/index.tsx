import { Accordion } from "@/components/ui/accordion";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
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
  const [refreshing, setRefreshing] = useState(false);
  const { id, regNumber } = useLocalSearchParams<AccountabilityDetailParams>();
  const {
    accountabilityReqDetail,
    isLoadingAccReqDetail,
    refetchAccReqDetail,
  } = useAccountabilityRequestDetail(Number(id));

  useEffect(() => {
    if (id) {
      navigation.setOptions({
        headerTitle: `Заказ №${String(regNumber)}`,
      });
    }
  }, [navigation, regNumber, id]);

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

  // console.log("accountabilityReqDetail", accountabilityReqDetail);

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

        <View className="work-block bg-white mt-3 rounded-2xl p-3 px-4">
          <View className="work-block-top py-3 pt-2 border-b mb-4 border-grayLight flex-row justify-between items-center">
            <Text className="font-bold text-primary uppercase">
              Продажа запчастей
            </Text>
          </View>

          <Table data={accountabilityReqDetail} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default AccountabilityDetail;
