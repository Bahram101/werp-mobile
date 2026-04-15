import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
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
    paddingBottom: 40,
    paddingHorizontal: 14,
  };

  switch (route.key) {
    case "report":
      return (
        <>
          <View className="mx-4 flex-row justify-between items-center mb-3 mt-2">
            <Text className="text-xl font-semibold">Материалы в подотчете</Text>
          </View>

          <View className="mb-3">
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <EquipmentItem item={item} isLast={data.length - 1 !== index} />
              )}
              keyExtractor={(item) => item.matnr.toString()}
              contentContainerStyle={style}
              onRefresh={onRefresh}
              refreshing={refreshing}
              ListFooterComponent={
                <View className="mt-4 mb-4 px-3">
                  <AnimatedButton className="rounded-full py-4">
                    Заказать запчасти
                  </AnimatedButton>
                </View>
              }
            />
          </View>
        </>
      );
    case "new":
      return (
        <>
          <View className="mx-4 flex-row justify-between items-center mb-3 mt-2">
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
          <View className="mx-4 flex-row justify-between items-center mb-3 mt-2">
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
