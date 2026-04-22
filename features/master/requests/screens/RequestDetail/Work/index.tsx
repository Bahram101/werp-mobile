import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useMatnr } from "../../../hooks/useMatnr";
import { useServices } from "../../../hooks/useService";
import Cartridges from "./components/Cartridges";
import Services from "./components/Services";
import SpareParts from "./components/SpareParts";

const RequestWorkScreen = () => {
  const { appNumber } = useLocalSearchParams();
  const navigation = useNavigation();

  const { services, isLoading } = useServices();
  const { data: matnrList } = useMatnr(3);
  const { data: cartridgeList } = useMatnr(1);

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

  return (
    <Layout>
      <Services data={services} />
      <SpareParts data={matnrList} />
      <Cartridges data={cartridgeList} />
    </Layout>
  );
};

export default RequestWorkScreen;
