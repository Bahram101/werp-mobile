import Banner from "@/components/ui/master/Banner";
import Layout from "@/components/ui/master/Layout";
import RequestTypesToday from "@/features/master/requests/components/RequestTypesToday";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  const requests = [
    {
      id: "a1",
      number: 1564654,
      title: "Аппарат не работает",
      category: "replace_cartridge",
      date: "2025-08-13",
      timeFrom: "11:00",
      timeTo: "11:40",
      address: "Мкр. Манир-4, дом 138",
      scheme: "green",
      icon: "cog-off-outline",
    },
    {
      id: "a2",
      number: 1564674,
      title: "Замена картриджа",
      category: "install_system",
      date: "2025-08-13",
      timeFrom: "11:40",
      timeTo: "12:20",
      address: "Мкр. Акжай-4, дом 96, кв 10",
      scheme: "blue",
      icon: "tools",
    },
    {
      id: "a3",
      number: 15646532,
      title: "Потоп",
      category: "replace_cartridge",
      date: "2025-08-13",
      timeFrom: "11:00",
      timeTo: "11:40",
      address: "Мкр. Таугуль-2, дом 17",
      scheme: "green",
      icon: "trending-down",
    },
    {
      id: "a4",
      number: 1564854,
      title: "С аппарата течет",
      category: "leak",
      date: "2025-08-13",
      timeFrom: "11:00",
      timeTo: "11:40",
      address: "Мкр. Манир-4, дом 138",
      scheme: "red",
      icon: "waves",
    },
    {
      id: "a5",
      number: 1564353,
      title: "Поиск по адресу",
      category: "address_search",
      date: "2025-08-13",
      timeFrom: "10:00",
      timeTo: "10:30",
      address: "ул. Абая, 25",
      scheme: "purple",
      icon: "briefcase-search-outline",
    },
  ];
  return (
    <Layout header>
      <Banner style={{ marginTop: -55 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 230 }}
      >
        <View className="mt-5 flex-1">
          <Text className="text-2xl font-semibold mb-2">
            Виды заявки на сегодня
          </Text>
          <RequestTypesToday requests={requests} />
        </View>
      </ScrollView>
    </Layout>
  );
}
