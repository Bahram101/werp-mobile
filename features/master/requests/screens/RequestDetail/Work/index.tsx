import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { request } from "@/services/api/request";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useMatnr } from "../../../hooks/useMatnr";
import { useRequestDetail } from "../../../hooks/useRequest";
import { useCheckServices, useServices } from "../../../hooks/useService";
import { SelectedMatnrItem, ServiceItem } from "../../../types";
import Cartridges from "./components/Cartridges";
import Services from "./components/Services";
import SpareParts from "./components/SpareParts";

const RequestWorkScreen = () => {
  const { appNumber } = useLocalSearchParams();
  const navigation = useNavigation();
  const {
    requestDetail,
    // isLoadingReqDetail
  } = useRequestDetail(Number(appNumber));

  const { services, isLoading } = useServices();
  const [selectedServiceItems, setSelectedServiceItems] = useState<
    ServiceItem[]
  >([]);
  const {
    checkService,
    resCheckServices,
    // isLoading: isLoadingCheckService,
  } = useCheckServices();
  const [selectedItems, setSelectedItems] = useState<SelectedMatnrItem[]>([]);
  const [filteredServList, setFilteredServList] = useState<ServiceItem[]>([]);
  const { data: matnrList } = useMatnr(3);
  const { data: cartridgeList } = useMatnr(1);

  useEffect(() => {
    if (services.length > 0) {
      setFilteredServList(
        services.filter((item) => !["1", "3", "4", "7"].includes(item.id)),
      );
    }
  }, [services, setFilteredServList]);

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

  const handlePay = () => {
    if (!request) return;
    const payload = {
      ...requestDetail,
      positions: selectedServiceItems.map((item) => ({
        serviceTypeId: Number(item.id),
        sum: item.price || 0,
        currencyId: 3,
        currencyName: "KZT",
        fno: null,
        id: null,
        matnrId: null,
        matnrName: null,
        matnrPrice: null,
        operationId: null,
        operationName: null,
        quantity: null,
        serviceId: null,
        servicePackageId: null,
        servicePackageName: null,
        serviceTypeName: null,
        warranty: false,
      })),
    };

    checkService(payload);
  };
  // console.log(
  //   "selectedServiceItems",
  //   JSON.stringify(selectedServiceItems, null, 2),
  // );
  // console.log("resCheckServices", resCheckServices);

  return (
    <Layout className="flex-columns gap-4">
      <Services
        data={filteredServList}
        selectedItems={selectedServiceItems}
        setSelectedItems={setSelectedServiceItems}
      />
      <SpareParts data={matnrList} />
      <Cartridges
        data={cartridgeList}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <View className="flex-1">
        <AnimatedButton
          className="w-full h-20 p-4"
          bg="primary"
          bgPressed="primaryDark"
          textColor="white"
          onPress={handlePay}
        >
          Оплатить
        </AnimatedButton>
      </View>
    </Layout>
  );
};

export default RequestWorkScreen;
