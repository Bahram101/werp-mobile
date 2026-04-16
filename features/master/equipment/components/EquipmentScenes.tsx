import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
import { useState } from "react";
import { FlatList } from "react-native";
import {
  useGetAccountibilities,
  useGetAccountibilitiesStatuses,
} from "../../requests/hooks/useMatnr";
import { EquipmentDto } from "../types";
import AccountabilityItem from "./AccountabilityItem";
import EquipmentItem from "./EquipmentItem";

type Props = {
  route: { key: string };
};

export default function EquipmentScenes({ route }: Props) {
  const { data, isLoading, refetchAccountibilities } =
    useGetAccountibilities<EquipmentDto[]>();
  let status = null;

  switch (route.key) {
    case "report":
      break;
    case "new":
      status = 1;
      break;
    case "closed":
      status = 2;
      break;
    default:
      break;
  }
  const { statusesData, isStatusesLoading, refetchStatuses } =
    useGetAccountibilitiesStatuses<any>(status!);

  const [refreshing, setRefreshing] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchAccountibilities();
    } finally {
      setRefreshing(false);
    }
  };

  const style = {
    paddingBottom: 10,
    paddingHorizontal: 14,
  };

  console.log("status", status);
  // console.log("statusesData", statusesData);

  switch (route.key) {
    case "report":
      return (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <EquipmentItem
              item={item}
              isFirst={index === 0}
              isLast={data.length - 1 !== index}
            />
          )}
          keyExtractor={(item) => item.matnr.toString()}
          contentContainerStyle={style}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListFooterComponent={
            <AnimatedButton className="rounded-full w-full py-4 mt-2">
              Заказать запчасти
            </AnimatedButton>
          }
        />
      );
    case "new":
      if (isStatusesLoading) return <Loader />;
      return (
        <FlatList
          data={statusesData.content}
          renderItem={({ item, index }) => {
            return <AccountabilityItem item={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={style}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      );
    case "closed":
      if (isStatusesLoading) return <Loader />;
      return (
        <FlatList
          data={statusesData.content}
          renderItem={({ item, index }) => {
            return <AccountabilityItem item={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={style}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      );
    default:
      return null;
  }
}
