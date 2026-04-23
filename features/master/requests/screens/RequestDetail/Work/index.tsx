import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useMatnr } from "../../../hooks/useMatnr";
import { useServices } from "../../../hooks/useService";
import { SelectedMatnrItem, ServiceItem } from "../../../types";
import Cartridges from "./components/Cartridges";
import Services from "./components/Services";
import SpareParts from "./components/SpareParts";

const RequestWorkScreen = () => {
  const { appNumber } = useLocalSearchParams();
  const navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState<SelectedMatnrItem[]>([]);
  const { services, isLoading } = useServices();
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

  console.log("selectedItemss", JSON.stringify(selectedItems, null, 2));

  return (
    <Layout>
      <Services data={filteredServList} />
      <SpareParts data={matnrList} />
      <Cartridges
        data={cartridgeList}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </Layout>
  );
};

export default RequestWorkScreen;
