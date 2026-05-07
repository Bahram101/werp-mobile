import { TypeMaterialIconNames } from "@/types/types";
import { formatCurrency, strToLowerCase } from "@/utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useWindowDimensions, View } from "react-native";
import { PaymentItem } from "../type";

export function Section({
  title,
  icon,
  items,
  size,
  type,
}: {
  title: string;
  icon: TypeMaterialIconNames;
  items: PaymentItem[];
  size?: number;
  type?: "services" | "spareParts" | "cartridges";
}) {
  const { width } = useWindowDimensions();

  if (!items?.length) return null;

  const isCartridges = type === "cartridges";
  const list = isCartridges ? items.slice(0, -1) : items;
  const cartridgesTotal = isCartridges ? items[items.length - 1] : null;

  return (
    <View className="">
      <View className="flex-row items-center mb-2">
        <MaterialCommunityIcons name={icon} size={18} color="#166534" />
        <Text className="ml-2 text-green-700 font-semibold">{title}</Text>
      </View>

      {list.map((item: PaymentItem, index) => (
        <View key={index} className="flex-row items-center py-1.5">
          <Text className="font-bold">
            {isCartridges && item.fno ? `F${item.fno}: ` : ""}
          </Text>
          <Text
            numberOfLines={!isCartridges ? 1 : undefined}
            className="textDark"
            style={!isCartridges ? { maxWidth: width * 0.45 } : undefined}
          >
            {strToLowerCase(item.title)}
          </Text>

          {!isCartridges && (
            <>
              <View className="flex-1 flex-row mx-2 overflow-hidden">
                {Array.from({ length: width }).map((_, i) => (
                  <Text key={i} className="text-grayMedium text-xs">
                    .
                  </Text>
                ))}
              </View>

              <Text className="text-gray-800">
                {formatCurrency(item.price)}
              </Text>
            </>
          )}
        </View>
      ))}
      {/* <View className="border-t border-dashed border-gray-300 mt-3" /> */}

      {isCartridges && cartridgesTotal && (
        <View className="flex-row justify-between mt-2">
          <Text className="font-semibold">Сумма картриджей</Text>
          <Text>{formatCurrency(cartridgesTotal.price)}</Text>
        </View>
      )}
    </View>
  );
}
