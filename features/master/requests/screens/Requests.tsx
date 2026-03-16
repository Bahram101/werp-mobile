import RequestsScenes from "@/features/master/requests/components/RequestsScenes";
import RequestsTabBar from "@/features/master/requests/components/RequestsTabBar";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { TabBarProps, TabView } from "react-native-tab-view";
import { useRequests } from "../hooks/useRequests";

export default function Requests() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "assigned", title: "Назначенные" },
    { key: "done", title: "Выполненные" },
    { key: "finished", title: "Завершенные" },
  ]);

  const { requests, isLoading } = useRequests();

  // const data: IRequest[] = [
  //   {
  //     id: 1,
  //     title: "ЗАМЕНА КАРТРИДЖА",
  //     number: "1564654",
  //     date: "13 август",
  //     time: "11:00 — 11:40",
  //     address: "Мкр. Мамыр-4, дом 138",
  //     status: 1,
  //     type: 1,
  //     paymentType: "1",
  //     paid: "34700",
  //   },
  // ];

  return (
    <View className="flex-1 pt-2" style={{ position: "relative" }}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={({ route }) => (
          <RequestsScenes route={route} data={requests} isLoading={isLoading} />
        )}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        removeClippedSubviews={false}
        renderTabBar={(props: TabBarProps<any>) => (
          <RequestsTabBar {...props} />
        )}
      />
    </View>
  );
}
