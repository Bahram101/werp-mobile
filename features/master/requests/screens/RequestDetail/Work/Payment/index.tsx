import Layout from "@/components/ui/master/Layout";
import { useCashBankHkonts } from "@/features/master/requests/hooks/useFinance";
import { useCreatePayment } from "@/features/master/requests/hooks/useService";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import React, { useEffect, useMemo } from "react";
import PaymentMethods from "./components/PaymentMethods";
import PaymentSummary from "./components/PaymentSummary";
import { PaymentItem } from "./type";

type CheckServiceResponse = {
  applicationNumber: string;
  sumForPay: number;
  positions: any[];
};

type GroupedPayment = {
  services: PaymentItem[];
  spareParts: PaymentItem[];
  cartridges: PaymentItem[];
};

const PaymentScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { cashBankHkonts, isLoadingCashBankHkonts } = useCashBankHkonts();
  const { createPaymentAsync, isLoading } = useCreatePayment();

  const data = queryClient.getQueryData<CheckServiceResponse>([
    "check-service-result",
  ]);

  const sumForPay = data?.sumForPay || 0;
  const serviceAllList = data?.positions;

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
            fno: item.fno,
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

  useEffect(() => {
    const appNumber = data?.applicationNumber;
    if (appNumber) {
      navigation.setOptions({
        title: `Заявка №${appNumber}`,
      });
    }
  }, [navigation, data]);

  const handlePay = async () => {
    const appNumber = data?.applicationNumber;
    if (!appNumber) return;

    const payload = {
      ...data,
      paymentParts: [
        {
          amount: sumForPay,
          hkont: 10100403,
          paymentType: "CASH",
          paymentNumber: "",
          date: "2026-05-07",
        },
      ],
    };

    createPaymentAsync(payload);

    console.log("payload", JSON.stringify(payload, null, 2));
  };

  console.log("paymentScreen", JSON.stringify(data, null, 2));
  console.log("cashBankHkonts", JSON.stringify(cashBankHkonts, null, 2));

  return (
    <Layout>
      <PaymentSummary
        services={services || []}
        spareParts={spareParts || []}
        cartridges={cartridges || []}
        total={sumForPay}
      />
      <PaymentMethods
        total={sumForPay}
        handlePay={handlePay}
        cashBankHkonts={cashBankHkonts}
      />
    </Layout>
  );
};

export default PaymentScreen;
