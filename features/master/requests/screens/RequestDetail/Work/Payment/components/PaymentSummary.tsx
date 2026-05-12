import { formatCurrency } from "@/utils/helpers";
import { Text, View } from "react-native";
import { PaymentItem } from "../type";
import { Section } from "./Section";

type Props = {
  services: PaymentItem[];
  spareParts: PaymentItem[];
  cartridges: PaymentItem[];
  total: number;
};

export default function PaymentSummary({
  services,
  spareParts,
  cartridges,
  total,
}: Props) {
  return (
    <View className="flex-column bg-white rounded-2xl p-5 gap-5">
      {/* <Section title="УСЛУГИ" icon="tools" items={services} /> */}

      <Section
        title="ПРОДАЖА ЗАПЧАСТЕЙ"
        icon="package-variant"
        items={spareParts}
      />
      <Section
        title="ПРОДАЖА КАРТРИДЖЕЙ"
        icon="package-variant"
        items={cartridges}
        type="cartridges"
      />

      {/* Divider */}
      <View className="border-t border-dashed border-gray-300" />

      <View className="flex-row justify-between">
        <Text className="font-bold">ИТОГО</Text>
        <Text className="font-bold">{formatCurrency(total)}</Text>
      </View>
    </View>
  );
}
