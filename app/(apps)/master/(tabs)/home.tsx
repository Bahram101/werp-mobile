import Banner from "@/components/ui/master/Banner";
import Header from "@/components/ui/master/Header";
import RequestTypesToday from "@/features/master/requests/components/RequestTypesToday";
import {
  useAssignedTotalCount,
  useDoneTodayCount,
  useFinishedMonthCount,
  useRequests,
} from "@/features/master/requests/hooks/useRequest";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    assignedReqCount,
    isLoading: isAssignedLoading,
    refetchAssigned,
  } = useAssignedTotalCount("2,9");

  const { doneReqCount, refetchDone } = useDoneTodayCount("8");

  const { finishedReqCount, refetchFinished } = useFinishedMonthCount("5");

  const { requests, isLoading, refetchRequests } = useRequests("2,9");

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
      await Promise.all([
        refetchAssigned(),
        refetchDone(),
        refetchFinished(),
        refetchRequests(),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View>
      <Header />
      <Banner
        style={{ marginTop: -55 }}
        isAssignedLoading={isAssignedLoading}
        assigned={assignedReqCount}
        done={doneReqCount}
        finished={finishedReqCount}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 230 }}
        refreshControl={
          <RefreshControl
            tintColor="#fff"
            refreshing={refreshing}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
      >
        <View className="mt-5 flex-1 px-4">
          <Text className="text-2xl font-semibold mb-2">Виды заявки</Text>
          <RequestTypesToday requests={result} isLoading={isLoading} />
        </View>
      </ScrollView>
    </View>
  );
}
