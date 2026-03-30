import { Accordion } from "@/components/ui/accordion";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { RequestDetailParams } from "@/types/navigation.interface";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRequestDetail } from "../../hooks/useRequest";
import Client from "./components/Client";
import DeviceData from "./components/Device";
import { Service } from "./components/Service";

export default function RequestDetailScreen() {
  const navigation = useNavigation();
  const { appNumber } = useLocalSearchParams<RequestDetailParams>();
  const { requestDetail, isFetching } = useRequestDetail(Number(appNumber));
  const [status, setStatus] = useState<"accepted" | "arrived">("accepted");

  useEffect(() => {
    if (appNumber) {
      navigation.setOptions({
        headerTitle: `Заявк №${String(appNumber)}`,
      });
    }
  }, [navigation, appNumber]);

  useEffect(() => {
    if (requestDetail?.contractNumber) {
      router.setParams({
        contractNumber: requestDetail.contractNumber,
      });
    }
  }, [requestDetail, navigation]);

  if (isFetching) {
    return <Loader />;
  }

  const handleMainButton = () => {
    if (status === "accepted") {
      setStatus("arrived");
    } else {
      router.push({
        pathname: "/(apps)/master/(tabs)/requests/[appNumber]/work",
        params: { appNumber },
      });
    }
  };

  const request = {
    client: {
      name: requestDetail.customerFIO,
      address: requestDetail.addressName,
    },
    service: { type: requestDetail.applicationTypeName },
    device: {
      id: requestDetail.tovarSn,
      productName: requestDetail.matnrName,
      contractNumber: requestDetail.contractNumber,
      contractDate: requestDetail.contractDate,
      filterState: {
        f1: requestDetail.f1MtLeft,
        f2: requestDetail.f2MtLeft,
        f3: requestDetail.f3MtLeft,
        f4: requestDetail.f4MtLeft,
        f5: requestDetail.f5MtLeft,
      },
    },
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
