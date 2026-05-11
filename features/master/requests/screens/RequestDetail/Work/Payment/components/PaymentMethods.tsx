import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { Field } from "@/components/ui/input/Field";
import { formatCurrency } from "@/utils/helpers";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { PaymentOption } from "./PaymentOption";

type FormValues = {
  cashVal: string;
  cashlessVal: string;
};

export default function PaymentMethods({
  total,
  isPaymentLoading,
  method,
  control,
  isSplit,
  setIsSplit,
  handleSubmit,
  setMethod,
  handlePay,
}: {
  total: number;
  method: "cash" | "cashless";
  isPaymentLoading: boolean;
  isSplit: boolean;
  setMethod: Dispatch<SetStateAction<"cash" | "cashless">>;
  setIsSplit: Dispatch<SetStateAction<boolean>>;
  control: Control<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  handlePay: (values: FormValues) => void;
}) {
  return (
    <View className="bg-white rounded-2xl p-4 mt-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-medium">Способ оплаты</Text>

        <View className="flex-row items-center">
          <Text className="mr-2 text-gray-500">
            {isSplit ? "Смещенная" : "Одна"}
          </Text>
          <Switch value={isSplit} onValueChange={setIsSplit} />
        </View>
      </View>

      <View className="border-t border-dashed border-gray-300 mb-4" />

      <View className="flex-col">
        <View className="flex-row gap-2">
          <PaymentOption
            label="Наличные"
            icon="cash"
            isActive={method === "cash"}
            method="cash"
            isSplit={isSplit}
            onPress={() => setMethod("cash")}
          />

          <PaymentOption
            label="Безналичные"
            icon="credit-card-outline"
            isActive={method === "cashless"}
            isSplit={isSplit}
            onPress={() => setMethod("cashless")}
          />
        </View>

        {isSplit && (
          <View className="flex-row gap-2">
            {/* CASH */}
            <View className="flex-1">
              <Field
                className="rounded-xl mt-4"
                control={control}
                name="cashVal"
                rules={{
                  required: "Поле обязательно",
                }}
              />
            </View>
            {/* CASHLESS */}
            <View className="flex-1 mt-4">
              <Field
                className="rounded-xl"
                control={control}
                name="cashlessVal"
                rules={{
                  required: "Поле обязательно",
                }}
              />
            </View>
          </View>
        )}

        <View className="flex-1 mt-4">
          <AnimatedButton
            className="h-14"
            bg="primary"
            bgPressed="primaryDark"
            textColor="white"
            isLoading={isPaymentLoading}
            onPress={handleSubmit(handlePay)}
          >
            Оплатить {formatCurrency(total)}
          </AnimatedButton>
        </View>
      </View>
    </View>
  );
}
