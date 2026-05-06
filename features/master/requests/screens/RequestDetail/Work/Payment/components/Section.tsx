import { TypeMaterialIconNames } from "@/types/types";
import { formatCurrency } from "@/utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useWindowDimensions, View } from "react-native";
import { PaymentItem } from "../type";

export function Section({
  title,
  icon,
  items,
  size,
}: {
  title: string;
  icon: TypeMaterialIconNames;
  items: PaymentItem[];
  size?: number;
}) {
  const { width } = useWindowDimensions();

  if (!items?.length) return null;

  return (
    <View className="">
      <View className="flex-row items-center mb-2">
        <MaterialCommunityIcons name={icon} size={18} color="#166534" />
        <Text className="ml-2 text-green-700 font-semibold">{title}</Text>
      </View>

      {items.map((item: PaymentItem, index) => (
        <View key={index} className="flex-row items-center py-1.5">
          <Text
            numberOfLines={1}
            className="textDark"
            style={{ maxWidth: width * 0.45 }}
          >
            {item.title}
          </Text>

          <View className="flex-1 flex-row mx-2 overflow-hidden">
            {Array.from({ length: width }).map((_, i) => (
              <Text key={i} className="text-grayMedium text-xs">
                .
              </Text>
            ))}
          </View>

          <Text className="text-gray-800">{formatCurrency(item.price)}</Text>
        </View>
      ))}

      {/* Divider */}
      {/* <View className="border-t border-dashed border-gray-300 mt-4 mb-2" /> */}
    </View>
  );
}
