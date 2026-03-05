import { Accordion } from "@/components/ui/accordion";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Layout from "@/components/ui/master/Layout";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Client from "./components/Client";
import DeviceData from "./components/Device";
import { History } from "./components/History";
import { Service } from "./components/Service";

export default function RequestDetailScreen() {
  const navigation = useNavigation();
  const { id, number } = useLocalSearchParams();
  const [status, setStatus] = useState<"accepted" | "arrived">("accepted");

  useEffect(() => {
    if (number) {
      navigation.setOptions({
        headerTitle: `Заявка №${String(number)}`,
      });
    }
  }, [navigation, number]);

  const handleMainButton = () => {
    if (status === "accepted") {
      setStatus("arrived");
    } else {
      router.push({
        pathname: "/(modules)/service/(master-tabs)/requests/work/[id]", // /(modules)/service/(tabs)/messages/[id]
        params: { id: String(id), number },
      });
    }
  };

  const request = {
    client: {
      name: "Асрор Умаров",
      address: "Мкр. Аксай-4, дом 96, кв 10",
      problem: "Устранить проблемы",
    },
    service: ["Замена картриджа", "Замена помпы", "Устранить проблемы"],
    device: {
      id: "4635-001495",
      product: "CEBILON DIGITAL UNIQUE",
      cn: "348045",
      date: "2017-10-11",
    },
    history: [
      {
        id: 1,
        date: "13 август 2023",
      },
      {
        id: 2,
        date: "19 ноябрь 2023",
      },
      {
        id: 3,
        date: "21 январь 2024",
      },
    ],
  };

  return (
    <Layout className="gap-3">
      <Accordion
        type="multiple"
        defaultValue={["client", "service"]}
        className="rounded-2xl gap-3 bg-transparent"
      >
        <Client data={request.client} />
        <Service data={request.service} />
        <DeviceData data={request.device} />
        <History data={request.history} />
      </Accordion>

      <View className="flex-row gap-3 ">
        <AnimatedButton
          className="p-4"
          bg="white"
          bgPressed="grayLight"
          icon="message-circle"
          iconColor="blue"
          textColor="blue"
        >
          <Text style={{ lineHeight: 18 }}>{"Чат с\n клиентом"}</Text>
        </AnimatedButton>
        <AnimatedButton
          className="p-4"
          bg="white"
          bgPressed="grayLight"
          icon="phone"
          iconColor="primary"
          textColor="primary"
        >
          <Text style={{ lineHeight: 18 }}>{"Позвонить \n клиенту"}</Text>
        </AnimatedButton>
      </View>

      <AnimatedButton
        className="h-20"
        bg={status === "accepted" ? "primary" : "blue"}
        bgPressed={status === "accepted" ? "primaryDark" : "blueDark"}
        icon={status === "accepted" ? "check" : "map-pin"}
        iconColor="white"
        onPress={() => handleMainButton()}
      >
        {status === "accepted" ? "Принять" : "Я на месте"}
      </AnimatedButton>

      <View className="flex-row gap-3">
        <AnimatedButton
          className="p-4"
          bg="yellow"
          bgPressed="yellowDark"
          icon="corner-down-right"
          iconColor="black"
          textColor="black"
        >
          <Text>Перенос</Text>
        </AnimatedButton>
        <AnimatedButton
          className="p-4"
          bg="red"
          bgPressed="redDark"
          icon="x-circle"
          iconColor="white"
          textColor="white"
        >
          <Text>Отменить</Text>
        </AnimatedButton>
      </View>
    </Layout>
  );
}
