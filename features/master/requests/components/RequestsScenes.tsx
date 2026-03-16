import { Loader } from "@/components/ui/Loader";
import { SlidersHorizontal } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { IRequest } from "../types";
import AssignedRequestCard from "./RequestCards/AssignedRequestCard";
import DoneRequestCard from "./RequestCards/DoneRequestCard";
import FinishedRequestCard from "./RequestCards/FinishedRequestCard";
import DoneSummary from "./Summaries/DoneSummary";
import FinishedSummary from "./Summaries/FinishedSummary";

type Props = {
  route: { key: string };
  data: IRequest[];
  isLoading: boolean;
};

export default function RequestsScenes({ route, data, isLoading }: Props) {
  let filteredData: IRequest[] = [];

  switch (route.key) {
    case "assigned":
      filteredData = data?.filter((item) => item.applicationStatusId === 2);
      break;
    case "done":
      filteredData = data?.filter((item) => item.applicationStatusId === 5);
      break;
    case "finished":
      filteredData = data?.filter((item) => item.applicationStatusId === 9);
      break;
  }

  const style = {
    paddingBottom: 10,
    paddingHorizontal: 14,
  };

  switch (route.key) {
    case "assigned":
      return (
        <>
          <View className="mx-4 flex-row justify-between items-center mb-3 mt-2">
            <Text className="text-xl font-semibold">Назначенные заявки</Text>
            <TouchableOpacity>
              <SlidersHorizontal size={21} />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <Loader />
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({ item }) => <AssignedRequestCard item={item} />}
              keyExtractor={(item) => item?.applicationNumber?.toString()}
              contentContainerStyle={style}
            />
          )}
        </>
      );
    case "done":
      return (
        <>
          <View className="mx-4 mt-2">
            <Text className="text-xl font-semibold">Выполненные заявки</Text>
          </View>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <DoneRequestCard item={item} />}
            keyExtractor={(item) => item.applicationNumber?.toString()}
            contentContainerStyle={style}
            ListFooterComponent={<DoneSummary />}
          />
        </>
      );
    case "finished":
      return (
        <>
          <View className="mx-4 mt-2">
            <Text className="text-xl font-semibold">
              Завершенные заявки с 1 августа
            </Text>
          </View>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <FinishedRequestCard item={item} />}
            keyExtractor={(item) => item.applicationNumber?.toString()}
            contentContainerStyle={style}
            ListFooterComponent={<FinishedSummary />}
          />
        </>
      );
    default:
      return null;
  }
}
