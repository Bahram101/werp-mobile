import { Loader } from "@/components/ui/Loader";
import Layout from "@/components/ui/master/Layout";
import { groupPaymentItems } from "@/features/master/utils/payment.helpers";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useDoneRequestDetail } from "../../hooks/useRequest";
import PaymentSummary from "../RequestDetail/Work/Payment/components/PaymentSummary";

type DoneRequestParams = {
  id: string;
};

const RequestDetailScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<DoneRequestParams>();
  const [refreshing, setRefreshing] = useState(false);

  const { doneRequestDetail, isLoadingDoneReqDetail, refetchDoneReqDetail } =
    useDoneRequestDetail(Number(id));

  console.log("doneRequestDetail", JSON.stringify(doneRequestDetail, null, 2));

  useEffect(() => {
    if (doneRequestDetail?.applicationNumber) {
      navigation.setOptions({
        title: `Заявка №${doneRequestDetail.applicationNumber}`,
      });
    }
  }, [navigation, doneRequestDetail]);

  const serviceAllList = doneRequestDetail?.checkedPayload?.positions;

  const { services, spareParts, cartridges } = useMemo(
    () => groupPaymentItems(serviceAllList),
    [serviceAllList],
  );

  if (isLoadingDoneReqDetail) {
    return <Loader />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchDoneReqDetail();
    } finally {
      setRefreshing(false);
    }
  };

  console.log("services", services);

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <PaymentSummary
        services={services || []}
        spareParts={spareParts || []}
        cartridges={cartridges || []}
        total={doneRequestDetail?.checkedPayload?.sumForPay}
      />
    </Layout>
  );
};

export default RequestDetailScreen;
