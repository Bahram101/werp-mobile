import Layout from "@/components/ui/master/Layout";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import React, { useEffect, useMemo } from "react";
import PaymentMethods from "./components/PaymentMethods";
import PaymentSummary from "./components/PaymentSummary";
import { PaymentItem } from "./type";

type CheckServiceResponse = {
  checkedPayload: {
    applicationNumber: string;
    positions: any[];
  };
};

type GroupedPayment = {
  services: PaymentItem[];
  spareParts: PaymentItem[];
  cartridges: PaymentItem[];
};

const PaymentScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<CheckServiceResponse>([
    "check-service-result",
  ]);
  const serviceAllList = data?.checkedPayload?.positions;

  const { services, spareParts, cartridges } = useMemo(() => {
    return serviceAllList?.reduce(
      (acc, item) => {
        if (![1, 3, 4].includes(item.serviceTypeId)) {
          acc.services.push({
            title: item.serviceTypeName,
            price: item.sum,
          });
        } else if (item.serviceTypeId === 3) {
          acc.spareParts.push({
            title: item.matnrName,
            price: item.sum,
          });
        } else if (item.serviceTypeId === 1) {
          acc.cartridges.push({
            title: item.matnrName,
            price: item.sum,
          });
        }

        return acc;
      },
      {
        services: [],
        spareParts: [],
        cartridges: [],
      } as GroupedPayment,
    );
  }, [serviceAllList]);

  const total = [...services, ...spareParts, ...cartridges]?.reduce(
    (acc, item) => acc + item.price,
    0,
  );

  useEffect(() => {
    const appNumber = data?.checkedPayload?.applicationNumber;
    if (appNumber) {
      navigation.setOptions({
        title: `Заявка №${appNumber}`,
      });
    }
  }, [navigation, data]);

  // console.log("paymentScreen", JSON.stringify(data, null, 2));
  // console.log("serviceList", JSON.stringify(serviceAllList, null, 2));

  return (
    <Layout>
      <PaymentSummary
        services={services || []}
        spareParts={spareParts || []}
        cartridges={cartridges || []}
        total={total}
      />
      <PaymentMethods total={total} />
    </Layout>
  );
};

export default PaymentScreen;
