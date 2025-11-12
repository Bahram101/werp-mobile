import { SlidersHorizontal } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import { IRequest } from "../types";
import AssignedRequestCard from "./RequestCards/AssignedRequestCard";
import DoneRequestCard from "./RequestCards/DoneRequestCard";
import FinishedRequestCard from "./RequestCards/FinishedRequestCard";
import DoneSummary from "./Summaries/DoneSummary";
import FinishedSummary from "./Summaries/FinishedSummary";

type Props = {
  route: { key: string };
  data: IRequest[];
};

export default function RequestsScenes({ route, data }: Props) {
  let filteredData: IRequest[] = [];

  switch (route.key) {
    case "assigned":
      filteredData = data.filter((item) => item.status === 1);
      break;
    case "done":
      filteredData = data.filter((item) => item.status === 2);
      break;
    case "finished":
      filteredData = data.filter((item) => item.status === 3);
      break;
  }

  switch (route.key) {
    case "assigned":
      return (
        <>
          <View className="mx-4 flex-row justify-between items-center mb-3 mt-2">
            <Text className="text-xl font-semibold">Назначенные заявки</Text>
            <SlidersHorizontal size={21} />
          </View>

          <FlatList
            data={filteredData}
            renderItem={({ item }) => <AssignedRequestCard item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 14 }}
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
            data={filteredData}
            renderItem={({ item }) => <DoneRequestCard item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 14 }}
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
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 14 }}
            ListFooterComponent={<FinishedSummary />}
          />
        </>
      );
    default:
      return null;
  }
}
