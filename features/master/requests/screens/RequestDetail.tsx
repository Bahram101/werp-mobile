import { Accordion } from "@/components/ui/accordion";
import Layout from "@/components/ui/master/Layout";
import Client from "@/features/master/requests/components/AccordionBlocks/Client";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import DeviceData from "../components/AccordionBlocks/Device";
import { History } from "../components/AccordionBlocks/History";
import { Service } from "../components/AccordionBlocks/Service";

export default function RequestDetailScreen() {
  const { id, number } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (number) {
      navigation.setOptions({
        headerTitle: `Заявка №${String(number)}`,
      });
    }
  }, [navigation, number]);

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
    <Layout>
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
    </Layout>
  );
}
