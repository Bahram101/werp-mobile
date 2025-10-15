import { FlatList, Text, View } from "react-native";
import { IRequest } from "../types";
import ActiveRequestCard from "./RequestCards/ActiveRequestCard";
import DoneRequestCard from "./RequestCards/DoneRequestCard";
import FinishedRequestCard from "./RequestCards/FinishedRequestCard";
import DoneSummary from "./Summaries/DoneSummary";
import FinishedSummary from "./Summaries/FinishedSummary";

type Props = {
  route: { key: string };
  data: IRequest[];
};

export default function RequestsScenes({ route, data }: Props) {
  switch (route.key) {
    case "assigned":
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => <ActiveRequestCard item={item} />}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 14 }}
        />
      );
    case "done":
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => <DoneRequestCard item={item} />}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 14 }}
          ListFooterComponent={<DoneSummary />}
        />
      );
    case "finished":
      return (
        <>
          <View className="mx-4">
            <Text className="text-xl font-semibold mt-2">
              Завершенные заявки с 1 августа
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => <FinishedRequestCard item={item} />}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 14 }}
            ListFooterComponent={<FinishedSummary />}
          />
        </>
      );
    default:
      return null;
  }
}
