import RequestsScenes from "@/features/master/requests/components/RequestsScenes";
import RequestsTabBar from "@/features/master/requests/components/RequestsTabBar";
import { IRequest } from "@/features/master/requests/types";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { TabBarProps, TabView } from "react-native-tab-view";

export default function Requests() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "assigned", title: "Назначенные" },
    { key: "done", title: "Выполненные" },
    { key: "finished", title: "Завершенные" },
  ]);

  const data: IRequest[] = [
    {
      id: 1,
      title: "ЗАМЕНА КАРТРИДЖА",
      number: "1564654",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 1,
      paymentType: "1",
      paid: "34700",
    },
    {
      id: 2,
      title: "УСТАНОВКА СИСТЕМЫ",
      number: "1564674",
      date: "13 август",
      time: "11:40 — 12:20",
      address: "Мкр. Аксаи-4, дом 96, кв 10",
      status: 2,
      paymentType: "2",
      paid: "15786",
    },
    {
      id: 3,
      title: "ЗАМЕНА КАРТРИДЖА",
      number: "1564632",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Таугуль-2, дом 17",
      status: 3,
      paymentType: "1",
      paid: "27300",
    },
    {
      id: 4,
      title: "ПОТОП",
      number: "1564854",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 4,
      paymentType: "1",
      paid: "34700",
    },
    {
      id: 5,
      title: "ПОТОП",
      number: "1564854",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 4,
      paymentType: "1",
      paid: "34700",
    },
    {
      id: 6,
      title: "ПОТОП",
      number: "1564854",
      date: "13 август",
      time: "11:00 — 11:40",
      address: "Мкр. Мамыр-4, дом 138",
      status: 4,
      paymentType: "1",
      paid: "34700",
    },
  ];

  return (
    <View className="h-full pt-2">
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={({ route }) => (
          <RequestsScenes route={route} data={data} />
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
