import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { ROUTES } from "@/constants/routes";
import { request } from "@/services/api/request";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useMatnr } from "../../../hooks/useMatnr";
import {
  useCheckServices,
  useServiceApplication,
  useServices,
} from "../../../hooks/useService";
import { SelectedMatnrItem, ServiceItem } from "../../../types";
import Cartridges from "./components/Cartridges";
import Services from "./components/Services";
import SpareParts from "./components/SpareParts";

const RequestWorkScreen = () => {
  const queryClient = useQueryClient();
  const { appNumber } = useLocalSearchParams();
  const navigation = useNavigation();
  const { serviceApplication, isLoadingServiceApp } = useServiceApplication(
    Number(appNumber),
  );

  const { services, isLoading } = useServices();
  const [selectedServiceItems, setSelectedServiceItems] = useState<
    ServiceItem[]
  >([]);
  const [selectedSpareItems, setSelectedSpareItems] = useState<
    SelectedMatnrItem[]
  >([]);
  const [selectedCartridgeItems, setSelectedCartridgeItems] = useState<
    SelectedMatnrItem[]
  >([]);

  const { checkServiceAsync, isLoading: isLoadingCheckService } =
    useCheckServices();
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

  const handlePay = async () => {
    if (!request) return;
    const mapServiceItem = (item: any) => ({
      serviceTypeId: Number(item.id),
      sum: item.price || 0,
      currencyId: 3,
      currencyName: "KZT",
      warranty: false,
      fno: null,
      id: null,
      matnrId: null,
      matnrName: null,
      matnrPrice: item.price,
      operationId: null,
      operationName: null,
      quantity: null,
      serviceId: null,
      servicePackageId: null,
      servicePackageName: null,
      serviceTypeName: null,
    });

    const mapSpareItem = (item: any) => ({
      currencyId: 3,
      currencyName: "KZT",
      fno: null,
      id: null,
      matnrId: item.matnrId,
      matnrName: item.matnrName,
      matnrPrice: item.price,
      operationId: null,
      operationName: null,
      quantity: item.selectedQty,
      serviceId: null,
      servicePackageId: null,
      servicePackageName: null,
      serviceTypeId: Number(item.index),
      serviceTypeName: null,
      sum: item.totalPrice,
      warranty: false,
    });

    const spareItems = [...selectedSpareItems, ...selectedCartridgeItems];

    const payload = {
      ...serviceApplication,
      positions: [
        ...selectedServiceItems.map(mapServiceItem),
        ...spareItems.map(mapSpareItem),
      ],
    };

    try {
      console.log("payload", JSON.stringify(payload, null, 2));
      const res = await checkServiceAsync(payload);
      // console.log("res", JSON.stringify(res, null, 2));
      queryClient.setQueryData(["check-service-result"], res);
      router.push({
        pathname: ROUTES.REQUEST_WORK_PAYMENT,
      });
    } catch (e: any) {
      Alert.alert("Предупреждение", e.message);
    }
  };

  console.log(
    "selectedServiceItems",
    JSON.stringify(selectedServiceItems, null, 2),
  );
  console.log(
    "selectedSpareItems",
    JSON.stringify(selectedSpareItems, null, 2),
  );
  console.log(
    "selectedCartridgeItems",
    JSON.stringify(selectedCartridgeItems, null, 2),
  );

  return (
    <Layout className="flex-columns gap-4">
      <Services
        data={filteredServList}
        selectedItems={selectedServiceItems}
        setSelectedItems={setSelectedServiceItems}
      />
      <SpareParts
        data={matnrList}
        selectedItems={selectedSpareItems}
        setSelectedItems={setSelectedSpareItems}
      />
      <Cartridges
        data={cartridgeList}
        selectedItems={selectedCartridgeItems}
        setSelectedItems={setSelectedCartridgeItems}
      />
      <View className="flex-1">
        <AnimatedButton
          bg="primary"
          bgPressed="primaryDark"
          textColor="white"
          isLoading={isLoadingCheckService}
          onPress={handlePay}
        >
          Проверить
        </AnimatedButton>
      </View>
    </Layout>
  );
};

export default RequestWorkScreen;
