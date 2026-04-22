import { Loader } from "@/components/ui/Loader";
import {
  getCurrentMonthName,
  getCurrentMonthStart,
  getToday,
} from "@/utils/date";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useFinishedSummary, useRequests } from "../hooks/useRequest";
import AssignedRequestCard from "./RequestCards/AssignedRequestCard";
import DoneRequestCard from "./RequestCards/DoneRequestCard";
import FinishedRequestCard from "./RequestCards/FinishedRequestCard";
import FinishedSummary from "./Summaries/FinishedSummary";

type Props = {
  route: { key: string };
};

export default function RequestsScenes({ route }: Props) {
  let status = "";
  let from: string | undefined;
  let to: string | undefined;
  let isFinished = false;

  const monthFrom = getCurrentMonthStart();
  const todayStr = getToday();

  switch (route.key) {
    case "assigned":
      status = "2,9,10";
      break;
    case "done":
      status = "8";
      from = todayStr;
      to = todayStr;
      break;
    case "finished":
      status = "5";
      from = monthFrom;
      to = todayStr;
      isFinished = true;
      break;
  }

  const [refreshing, setRefreshing] = useState(false);
  const { requests, isLoadingRequests, refetch } = useRequests(
    status,
    from,
    to,
  );
  const { finishedSummaryData, refetchSummary, isLoading } = useFinishedSummary(
    {
      enabled: isFinished,
    },
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetch(), refetchSummary()]);
    } finally {
      setRefreshing(false);
    }
  };

  const assignedReqList = [...requests].sort((a, b) => {
    const getPriority = (item: any) => {
      if (item.applicationStatusId === 9 || item.applicationStatusId === 10)
        return 1;
      if (item.urgencyLevel) return 2;
      return 3;
    };
    return getPriority(a) - getPriority(b);
  });

  const style = {
    paddingBottom: 10,
    paddingHorizontal: 14,
  };

  if (isLoadingRequests) {
    return <Loader />;
  }

  switch (route.key) {
    case "assigned":
      return (
        <>
          <FlatList
            data={assignedReqList}
            renderItem={({ item }) => <AssignedRequestCard item={item} />}
            keyExtractor={(item) => item?.applicationNumber?.toString()}
            contentContainerStyle={style}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </>
      );
    case "done":
      return (
        <>
          <FlatList
            data={requests}
            renderItem={({ item }) => <DoneRequestCard item={item} />}
            keyExtractor={(item) => item.applicationId?.toString()}
            contentContainerStyle={style}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </>
      );
    case "finished":
      return (
        <>
          <View className="mx-4 mb-3">
            <Text className="text-xl font-semibold">
              Завершенные заявки с 1 {getCurrentMonthName()}
            </Text>
          </View>
          <FlatList
            data={finishedSummaryData?.premiumSum}
            renderItem={({ item }) => <FinishedRequestCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={style}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListFooterComponent={
              <FinishedSummary finishedSummaryData={finishedSummaryData} />
            }
          />
        </>
      );
    default:
      return null;
  }
}
