import Banner from "@/components/ui/master/Banner";
import Header from "@/components/ui/master/Header";
import RequestTypesToday from "@/features/master/requests/components/RequestTypesToday";
import {
  useRequests,
  useRequestsCount,
} from "@/features/master/requests/hooks/useRequests";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  const { count: assigned, isLoading: isAssignedLoading } =
    useRequestsCount("2");
  const { count: done } = useRequestsCount("5");
  const { requests, isLoading } = useRequests();

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
