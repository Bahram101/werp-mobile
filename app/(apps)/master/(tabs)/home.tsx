import Banner from "@/components/ui/master/Banner";
import Header from "@/components/ui/master/Header";
import RequestTypesToday from "@/features/master/requests/components/RequestTypesToday";
import {
  useRequests,
  useRequestsCount,
} from "@/features/master/requests/hooks/useRequest";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    count: assigned,
    isLoading: isAssignedLoading,
    refetch: refetchAssigned,
  } = useRequestsCount("2");
  const { count: done, refetch: refetchDone } = useRequestsCount("5");
  const { requests, isLoading, refetch: refetchRequests } = useRequests();

  const groupedRequestList = requests.reduce(
    (acc: any, item: any) => {
      const key = item.applicationTypeId;
      if (!acc[key]) {
        acc[key] = {
          id: key,
          title: item.applicationTypeName,
          count: 0,
        };
      }
      acc[key].count += 1;
      return acc;
    },
    {} as Record<number, { id: number; title: string; count: number }>,
  );

  const result = Object.values(groupedRequestList);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchAssigned(), refetchDone(), refetchRequests()]);
    } finally {
      setRefreshing(false);
    }
  };

  // console.log("result", JSON.stringify(requests, null, 2));

  return (
    <View>
      <Header />
      <Banner
        style={{ marginTop: -55 }}
        assigned={assigned}
        isAssignedLoading={isAssignedLoading}
        done={done}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 230 }}
        refreshControl={
          <RefreshControl
            tintColor="#fff"
            refreshing={isLoading}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
      >
        <View className="mt-5 flex-1 px-4">
          <Text className="text-2xl font-semibold mb-2">
            Виды заявки на сегодня
          </Text>
          <RequestTypesToday requests={result} isLoading={isLoading} />
        </View>
      </ScrollView>
    </View>
  );
}
