import { Accordion } from "@/components/ui/accordion";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { ROUTES } from "@/constants/routes";
import { RequestDetailParams } from "@/types/navigation.interface";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  useRequestDetail,
  useUpdateRequestStatus,
} from "../../hooks/useRequest";
import Client from "./components/Client";
import DeviceData from "./components/Device";
import { Service } from "./components/Service";

export default function RequestDetailScreen() {
  const navigation = useNavigation();
  const { appNumber } = useLocalSearchParams<RequestDetailParams>();
  const { requestDetail, isLoadingReqDetail, refetchRequestDetail } =
    useRequestDetail(Number(appNumber));
  const { updateRequestStatus, isLoading } = useUpdateRequestStatus();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (appNumber) {
      navigation.setOptions({
        headerTitle: `Заявка №${String(appNumber)}`,
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

  if (isLoadingReqDetail || !requestDetail) {
    return <Loader />;
  }

  const handleMainButton = () => {
    if (requestDetail.applicationStatusId === 2) {
      updateRequestStatus({
        reqId: requestDetail.applicationNumber,
        statusId: 9,
      });
    }
    if (requestDetail.applicationStatusId === 9) {
      updateRequestStatus(
        {
          reqId: requestDetail.applicationNumber,
          statusId: 10,
        },
        {
          onSuccess: () => {
            router.push({
              pathname: ROUTES.REQUEST_WORK,
              params: { appNumber },
            });
          },
        },
      );
    }
    if (requestDetail.applicationStatusId === 10) {
      router.push({
        pathname: ROUTES.REQUEST_WORK,
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

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchRequestDetail();
    } finally {
      setRefreshing(false);
    }
  };

  console.log("requestDetail", JSON.stringify(requestDetail, null, 2));

  return (
    <Layout className="gap-3" refreshing={refreshing} onRefresh={onRefresh}>
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
        bg={requestDetail.applicationStatusId === 2 ? "primary" : "blue"}
        bgPressed={
          requestDetail.applicationStatusId === 2 ? "primaryDark" : "blueDark"
        }
        icon={requestDetail.applicationStatusId === 2 ? "check" : "map-pin"}
        iconColor="white"
        onPress={handleMainButton}
        isLoading={isLoading}
      >
        {requestDetail.applicationStatusId === 2
          ? "Принять"
          : requestDetail.applicationStatusId === 9
            ? "Прибыл"
            : "В работе"}
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
          onPress={handleMainButton}
        >
          <Text>Отменить</Text>
        </AnimatedButton>
      </View>
    </Layout>
  );
}
