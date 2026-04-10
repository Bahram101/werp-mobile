import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useMatnr } from "../../../hooks/useMatnr";
import { useServices } from "../../../hooks/useService";
import { SparePartItem } from "../../../types";
import Cartridges from "./components/Cartridges";
import Services from "./components/Services";
import SpareParts from "./components/SpareParts";

const RequestWorkScreen = () => {
  const { appNumber } = useLocalSearchParams();
  const navigation = useNavigation();

  const { services, isLoading } = useServices();
  // const { matnrList, isMatnrLoading } = useMatnr();
  const { matnrList: cartridgeList, isLoading: isCartridgeLoading } =
    useMatnr(1);

  const spareParts: SparePartItem[] = [
    {
      id: 1,
      name: "Таблетка антипотопа",
      price: 1200,
      serialNumber: "341133Z",
      quantity: 10,
    },
    {
      id: 2,
      serialNumber: "341074Z",
      name: "Прибор контролирующий течение",
      price: 18500,
      quantity: 15,
    },
    {
      id: 3,
      serialNumber: "340029Z",
      name: "Насосная часть помпы в комплекте",
      price: 14500,
      quantity: 60,
    },
    {
      id: 4,
      serialNumber: "340003Z01",
      name: "Корпус мембраны в комплекте",
      price: 9800,
      quantity: 2,
    },
    {
      id: 5,
      serialNumber: "340006Z01",
      name: "Автоматическая затворка",
      price: 7200,
      quantity: 16,
    },
    {
      id: 6,
      serialNumber: "340008Z01",
      name: "Кран, короткий, 75 мм",
      price: 2500,
      quantity: 32,
    },
    {
      id: 7,
      serialNumber: "349093Z",
      name: "Сверло Ø20, для металла",
      price: 1600,
      quantity: 41,
    },
    {
      id: 8,
      serialNumber: "349095Z",
      name: "Сверло корончатое по граниту, мрамору",
      price: 3500,
      quantity: 29,
    },
    {
      id: 9,
      serialNumber: "341003Z",
      name: "Пластиковый клапан резервуара",
      price: 2500,
      quantity: 27,
    },
    {
      id: 10,
      serialNumber: "346003Z",
      name: "Помпа",
      price: 3200,
      quantity: 17,
    },
    {
      id: 11,
      serialNumber: "356004Z",
      name: "Электромагнитный клапан",
      price: 1500,
      quantity: 10,
    },
    {
      id: 12,
      serialNumber: "345001Z",
      name: "Белый шланг",
      price: 300,
      quantity: 19,
    },
    {
      id: 13,
      serialNumber: "345001Z",
      name: "Белый шланг2",
      price: 300,
      quantity: 19,
    },
    {
      id: 14,
      serialNumber: "345001Z",
      name: "Белый шланг3",
      price: 300,
      quantity: 19,
    },
    {
      id: 15,
      serialNumber: "345001Z",
      name: "Белый шланг4",
      price: 300,
      quantity: 19,
    },
    {
      id: 16,
      serialNumber: "345001Z",
      name: "Белый шланг5",
      price: 300,
      quantity: 19,
    },
  ];

  useEffect(() => {
    if (appNumber) {
      navigation.setOptions({
        headerTitle: `Заявка №${String(appNumber)}`,
      });
    }
  }, [navigation, appNumber]);

  if (isLoading) {
    return <Loader />;
  }

  console.log("cartridgeList", JSON.stringify(cartridgeList, null, 2));

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="request-work flex-1">
          <Services data={services} />
          <SpareParts data={spareParts} />
          <Cartridges data={cartridgeList} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default RequestWorkScreen;
