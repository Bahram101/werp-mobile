import Layout from "@/components/ui/master/Layout";
import ActiveRequestCard from "@/features/master/requests/components/RequestCard/ActiveRequestCard";
import DoneRequestCard from "@/features/master/requests/components/RequestCard/DoneRequestCard";
import FinishedRequestCard from "@/features/master/requests/components/RequestCard/FinishedRequestCard";
import DoneSummary from "@/features/master/requests/components/Summary/DoneSummary";
import FinishedSummary from "@/features/master/requests/components/Summary/FinishedSummary";
import { useState } from "react";
import {
  FlatList,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { TabBar, TabBarItem, TabBarProps, TabView } from 'react-native-tab-view';

export default function Requests() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "active", title: "Активные" },
    { key: "done", title: "Выполненные" },
    { key: "finished", title: "Завершенные" },
  ]);

  const activeData: {
    id: number;
    title: string;
    number: string;
    date: string;
    time: string;
    address: string;
    status: number;
    paymentType: string;
    paid: string;
  }[] = [
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
  ];

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "active":
        return (
          <FlatList
            data={activeData}
            renderItem={({ item }) => <ActiveRequestCard item={item} />}
            contentContainerStyle={{ paddingBottom: 115 }}
          />
        );
      case "done":
        return (
          <>
            <FlatList
              data={activeData}
              renderItem={({ item }) => <DoneRequestCard item={item} />}
              contentContainerStyle={{ paddingBottom: 115 }}
              ListFooterComponent={<DoneSummary />}
            />
          </>
        );
      case "finished":
        return (
          <>
            <Text className="text-xl font-semibold mt-3 mb-2">
              Завершенные заявки с 1 августа
            </Text>
            <FlatList
              data={activeData}
              renderItem={({ item }) => <FinishedRequestCard item={item} />}
              contentContainerStyle={{ paddingBottom: 115 }}
              ListFooterComponent={<FinishedSummary />}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <View className="px-4 h-full pt-2">
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          removeClippedSubviews={false}
          renderTabBar={(props: TabBarProps<any>) => {
            return (
              <TabBar
                {...props}
                activeColor="black"
                inactiveColor="black"
                style={{
                  backgroundColor: "#D4D4D4",
                  height: 43,
                  borderRadius: 40,
                  marginBottom: 4,
                }}
                contentContainerStyle={{
                  backgroundColor: "transparent",
                  borderRadius: 30,
                  alignItems: "center",
                }}
                indicatorStyle={{
                  backgroundColor: "white",
                  height: "88%",
                  width: "32%",
                  borderRadius: 9999,
                  marginVertical: 2,
                  marginLeft: 3,
                }}
                tabStyle={{
                  flex: 1,
                  // width: 'auto',
                }}
                renderTabBarItem={(itemProps) => {
                  const { key, ...rest } = itemProps;
                  return (
                    <TabBarItem
                      key={itemProps.key}
                      {...rest}
                      label={({ labelText }) => (
                        <Text
                          style={{
                            fontSize: 14,
                            padding: 0,
                          }}
                        >
                          {labelText}
                        </Text>
                      )}
                    />
                  );
                }}
              />
            );
          }}
        />
      </View>
    </Layout>
  );
}
