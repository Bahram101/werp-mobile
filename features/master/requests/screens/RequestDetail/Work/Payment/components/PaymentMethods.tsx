import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";
import { Switch, Text, View } from "react-native";
import { PaymentOption } from "./PaymentOptions";

export default function PaymentMethods({ total }: { total: number }) {
  const [isSplit, setIsSplit] = useState(false);
  const [method, setMethod] = useState<"cash" | "card">("cash");

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
            isActive={method === "card"}
            onPress={() => setMethod("card")}
          />
        </View>

        <View className="flex-1">
          <AnimatedButton
            bg="primary"
            bgPressed="primaryDark"
            textColor="white"
            // isLoading={isLoadingCheckService}
            // onPress={handlePay}
          >
            Оплатить {formatCurrency(total)}
          </AnimatedButton>
        </View>
      </View>
    </View>
  );
}
