import {
  getCurrentMonthName,
  getCurrentMonthStart,
  getToday,
} from "@/utils/date";
import { SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
  const { requests, refetchRequests } = useRequests(status, from, to);
  const { finishedSummaryData, refetchSummary } = useFinishedSummary({
    enabled: isFinished,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchRequests(), refetchSummary()]);
    } finally {
      setRefreshing(false);
    }
  };

  let groupedList = [];
  if (route.key === "finished") {
    groupedList = requests.reduce(
      (acc: any, curr: any) => {
        const key = curr.applicationTypeId;
        if (!acc[key]) {
          acc[key] = {
            id: key,
            title: curr.applicationTypeName,
            count: 0,
          };
        }
        acc[key].count += 1;
        return acc;
      },
      {} as Record<number, { id: number; title: string; count: number }>,
    );
  }

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

  switch (route.key) {
    case "assigned":
      return (
        <>
          <View className="mx-4 flex-row justify-between items-center mb-3 mt-2">
            <Text className="text-xl font-semibold">Распределенные заявки</Text>
            <TouchableOpacity>
              <SlidersHorizontal size={21} />
            </TouchableOpacity>
          </View>

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
          <View className="mx-4 mt-2">
            <Text className="text-xl font-semibold">Выполненные заявки</Text>
          </View>
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
          <View className="mx-4 mt-2">
            <Text className="text-xl font-semibold">
              Завершенные заявки с 1 {getCurrentMonthName()}
            </Text>
          </View>
          <FlatList
            ListHeaderComponent={
              <FinishedSummary
                data={requests}
                premiumData={finishedSummaryData}
              />
            }
            data={groupedList ? Object.values(groupedList) : ([] as any)}
            renderItem={({ item }) => <FinishedRequestCard item={item} />}
            keyExtractor={(item) => item.id?.toString()}
            contentContainerStyle={style}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </>
      );
    default:
      return null;
  }
}
