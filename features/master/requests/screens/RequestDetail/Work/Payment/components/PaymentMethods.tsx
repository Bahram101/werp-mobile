import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { COLORS } from "@/constants/theme";
import { formatCurrency } from "@/utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

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
          {/* Cash */}
          <Pressable
            onPress={() => setMethod("cash")}
            className={cn(
              "flex-1 flex-row items-center justify-center rounded-xl border p-3",
              method === "cash"
                ? "border-primary bg-green-100"
                : "border-grayMedium",
            )}
          >
            <MaterialCommunityIcons
              name="cash"
              size={23}
              color={method === "cash" ? COLORS.primary : COLORS.grayDark}
            />
            <Text
              className={cn(
                "ml-2",
                method === "cash" ? "text-primary" : "text-grayDark",
              )}
            >
              Наличные
            </Text>
          </Pressable>

          {/* Card */}
          <Pressable
            onPress={() => setMethod("card")}
            className={cn(
              "flex-1 flex-row items-center justify-center rounded-xl border p-3",
              method === "card"
                ? "border-primary bg-green-100"
                : "border-grayMedium",
            )}
          >
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={18}
              color={method === "card" ? COLORS.primary : COLORS.grayDark}
            />
            <Text
              className={cn(
                "ml-2",
                method === "card" ? "text-primary" : "text-grayDark",
              )}
            >
              Безналичные
            </Text>
          </Pressable>
        </View>

        {/* Pay Button */}
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

        {/* Secondary */}
        <View className="flex-1">
          <AnimatedButton
            bg="grayMedium"
            bgPressed="grayDark"
            textColor="white"
            // onPress={handlePay}
          >
            Изменить
          </AnimatedButton>
        </View>
      </View>
    </View>
  );
}
