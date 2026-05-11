import Layout from "@/components/ui/master/Layout";
import { ROUTES } from "@/constants/routes";
import { useCreatePayment } from "@/features/master/requests/hooks/useService";
import { getToday } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
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
  const [method, setMethod] = useState<"cash" | "cashless">("cash");
  const [isSplit, setIsSplit] = useState(false);
  const { createPaymentAsync, isPaymentLoading } = useCreatePayment();

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      cashVal: "",
      cashlessVal: "",
    },
  });

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

  const handlePay = async (values: {
    cashVal: string;
    cashlessVal: string;
  }) => {
    console.log("values", JSON.stringify(values, null, 2));
    const appNumber = data?.applicationNumber;
    if (!appNumber) return;

    if (!isSplit) {
      const payload = {
        ...data,
        paymentParts: [
          {
            amount: sumForPay,
            hkont: method === "cash" ? 10100403 : 10300220,
            paymentType: method === "cash" ? "CASH" : "CASHLESS",
            paymentNumber: "",
            date: getToday(),
          },
        ],
      };

      console.log("single payload", JSON.stringify(payload, null, 2));

      if (method === "cash") {
        try {
          await createPaymentAsync(payload);
          router.push({
            pathname: ROUTES.PAYMENT_SUCCESS,
          });
        } catch (e: any) {
          Alert.alert("Ошибка", e.message);
        }
        return;
      }

      if (method === "cashless") {
        queryClient.setQueryData(["qr-payment"], payload);
        router.push({
          pathname: ROUTES.QR_PAYMENT,
          params: {
            appNumber: String(payload.applicationNumber),
            method,
          },
        });
      }
    } else {
      const payload = {
        ...data,
        paymentParts: [
          {
            amount: Number(values.cashVal),
            hkont: 10100403,
            paymentType: "CASH",
            paymentNumber: "",
            date: getToday(),
          },
          {
            amount: Number(values.cashlessVal),
            hkont: 10300220,
            paymentType: "CASHLESS",
            paymentNumber: "",
            date: getToday(),
          },
        ],
      };

      console.log("split payload", JSON.stringify(payload, null, 2));

      if (Number(values.cashVal) + Number(values.cashlessVal) !== sumForPay) {
        Alert.alert("Ошибка", `Сумма должна равняться ${sumForPay}`);
        return;
      }

      try {
        queryClient.setQueryData(["qr-payment-split"], payload);
        router.push({
          pathname: ROUTES.QR_PAYMENT,
          params: {
            appNumber: String(payload.applicationNumber),
          },
        });
        // reset();
      } catch (e: any) {
        Alert.alert("Ошибка", e.message);
      }
    }
  };

  console.log("isSplit", isSplit);

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
        isPaymentLoading={isPaymentLoading}
        method={method}
        control={control}
        isSplit={isSplit}
        setIsSplit={setIsSplit}
        handleSubmit={handleSubmit}
        setMethod={setMethod}
        handlePay={handlePay}
      />
    </Layout>
  );
};

export default PaymentScreen;
