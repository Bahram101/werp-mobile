import { Loader } from "@/components/ui/Loader";
import {
  getCurrentMonthName,
  getCurrentMonthStart,
  getToday,
} from "@/utils/date";
import { SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useRequests } from "../hooks/useRequest";
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
      break;
  }

  const { requests, isLoading, refetchRequests } = useRequests(
    status,
    from,
    to,
  );
  const [refreshing, setRefreshing] = useState(false);

  const style = {
    paddingBottom: 10,
    paddingHorizontal: 14,
  };

  console.log("requests", requests.length);
  // console.log("req", requests[0]);

  if (isLoading) {
    return <Loader />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchRequests();
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
            data={requests}
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
            data={groupedList ? Object.values(groupedList) : ([] as any)}
            renderItem={({ item }) => <FinishedRequestCard item={item} />}
            keyExtractor={(item) => item.id?.toString()}
            contentContainerStyle={style}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={<FinishedSummary data={requests} />}
          />
        </>
      );
    default:
      return null;
  }
}
