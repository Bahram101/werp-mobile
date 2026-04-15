import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
import cn from "clsx";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useGetAccountibilities } from "../../requests/hooks/useMatnr";
import { EquipmentDto } from "../types";
import EquipmentItem from "./EquipmentItem";

type Props = {
  route: { key: string };
};

export default function EquipmentScenes({ route }: Props) {
  const { data, isLoading, refetchAccountibilities } =
    useGetAccountibilities<EquipmentDto[]>();
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

  switch (route.key) {
    case "report":
      return (
        // <View className="bg-white rounded-2xl overflow-hidden">
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            let isFirst = index === 0;
            return (
              <View className={cn("bg-white", isFirst && "rounded-t-2xl")}>
                <EquipmentItem
                  item={item}
                  isFirst={index === 0}
                  isLast={data.length - 1 !== index}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.matnr.toString()}
          contentContainerStyle={style}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListHeaderComponent={
            <Text className="text-xl font-semibold pb-3">
              Материалы в подотчете
            </Text>
          }
          ListFooterComponent={
            <AnimatedButton className="rounded-full w-full py-4 mt-2">
              Заказать запчасти
            </AnimatedButton>
          }
        />
        // </View>
      );
    case "new":
      return (
        <>
          <View className="mx-4 flex-row justify-between items-center mb-3">
            <Text className="text-xl font-semibold">Новые</Text>
          </View>

          <FlatList
            data={[]}
            renderItem={({ item }) => null}
            keyExtractor={(item, index) => index.toString()}
            // contentContainerStyle={style}
            // onRefresh={onRefresh}
            // refreshing={refreshing}
          />
        </>
      );
    case "closed":
      return (
        <>
          <View className="mx-4 flex-row justify-between items-center mb-3">
            <Text className="text-xl font-semibold">Закрытые</Text>
          </View>

          <FlatList
            data={[]}
            renderItem={({ item }) => null}
            keyExtractor={(item, index) => index.toString()}
            // contentContainerStyle={style}
            // onRefresh={onRefresh}
            // refreshing={refreshing}
          />
        </>
      );
    default:
      return null;
  }
}
