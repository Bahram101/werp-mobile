import { FlatList, Text } from "react-native";
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
    case "active":
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => <ActiveRequestCard item={item} />}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      );
    case "done":
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => <DoneRequestCard item={item} />}
          contentContainerStyle={{ paddingBottom: 10 }}
          ListFooterComponent={<DoneSummary />}
        />
      );
    case "finished":
      return (
        <>
          <Text className="text-xl font-semibold mt-2">
            Завершенные заявки с 1 августа
          </Text>
          <FlatList
            data={data}
            renderItem={({ item }) => <FinishedRequestCard item={item} />}
            contentContainerStyle={{ paddingBottom: 10 }}
            ListFooterComponent={<FinishedSummary />}
          />
        </>
      );
    default:
      return null;
  }
}
