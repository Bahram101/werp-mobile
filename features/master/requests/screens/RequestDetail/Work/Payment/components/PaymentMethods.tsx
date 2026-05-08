import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { CashBankResponse } from "@/features/master/requests/types";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";
import { Switch, Text, View } from "react-native";
import { PaymentOption } from "./PaymentOptions";

export default function PaymentMethods({
  total,
  cashBankHkonts,
  isPaymentLoading,
  method,
  setMethod,
  handlePay,
}: {
  total: number;
  method: "cash" | "cashless";
  isPaymentLoading: boolean;
  setMethod: React.Dispatch<React.SetStateAction<"cash" | "cashless">>;
  cashBankHkonts: CashBankResponse[];
  handlePay: () => void;
}) {
  const [isSplit, setIsSplit] = useState(false);

  return (
    <View className="bg-white rounded-2xl p-4 mt-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-medium">Способ оплаты</Text>

        <View className="flex-row items-center">
          <Text className="mr-2 text-gray-500">Одна</Text>
          <Switch value={isSplit} onValueChange={setIsSplit} />
        </View>
      </View>

      <View className="border-t border-dashed border-gray-300 mb-4" />

      <View className="flex-col gap-3">
        <View className="flex-row gap-2">
          <PaymentOption
            label="Наличные"
            icon="cash"
            isActive={method === "cash"}
            method="cash"
            onPress={() => setMethod("cash")}
          />
          <PaymentOption
            label="Безналичные"
            icon="credit-card-outline"
            isActive={method === "cashless"}
            onPress={() => setMethod("cashless")}
          />
        </View>

        <View className="flex-1">
          <AnimatedButton
            className="h-14"
            bg="primary"
            bgPressed="primaryDark"
            textColor="white"
            isLoading={isPaymentLoading}
            onPress={handlePay}
          >
            Оплатить {formatCurrency(total)}
          </AnimatedButton>
        </View>
      </View>
    </View>
  );
}
