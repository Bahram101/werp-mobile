import { Accordion } from "@/components/ui/accordion";
import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/main/Layout";
import { groupPaymentItems } from "@/features/master/utils/payment.helpers";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ScrollView } from "react-native";
import { useHistory } from "../../../hooks/useHistory";
import PaymentSummary from "../Work/Payment/components/PaymentSummary";
import HistoryDocInfo from "./components/HistoryDocInfo";

const HistoryDetailScreen = () => {
  const navigation = useNavigation();
  const { serviceId } = useLocalSearchParams();
  const { history, isLoading } = useHistory(Number(serviceId));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `История`,
    });
  }, [navigation]);

  const serviceAllList = history.positions;

  const { services, spareParts, cartridges } = useMemo(
    () => groupPaymentItems(serviceAllList),
    [serviceAllList],
  );

  if (isLoading) {
    return <Loader />;
  }

  console.log("history", JSON.stringify(history, null, 2));

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ paddingBottom: 20, gap: 20 }}>
        <Accordion
          type="multiple"
          defaultValue={["info"]}
          className="rounded-2xl gap-3 bg-transparent"
        >
          <HistoryDocInfo data={history} />
        </Accordion>

        <PaymentSummary
          services={services || []}
          spareParts={spareParts || []}
          cartridges={cartridges || []}
          total={history.sumForPay}
        />
      </ScrollView>
    </Layout>
  );
};

export default HistoryDetailScreen;
