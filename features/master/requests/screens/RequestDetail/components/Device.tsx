import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { filterColors } from "@/constants/theme";
import cn from "clsx";
import { Text, View } from "react-native";
import { DeviceType } from "../../../types";

const DeviceData = ({ data }: { data: DeviceType }) => {
  return (
    <BaseAccordion title="Данные аппарата" icon="alert-circle" value="device">
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Зав.№:</Text>
        <Text className="font-semibold">{data.id}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Товар:</Text>
        <Text className="font-semibold">{data.productName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">CN:</Text>
        <Text className="font-semibold">{data.contractNumber}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Дата продажи:</Text>
        <Text className="font-semibold"> {data.contractDate}</Text>
      </View>
      <View className="flex-row w-full justify-between border-t border-grayLight pt-3 mt-1 flex-wrap">
        {Object.entries(data.filterState).map(([key, value]) => {
          const color = filterColors[key as keyof typeof filterColors];
          return (
            <View
              key={key}
              className={cn(
                "flex-row items-center rounded-lg mr-2 mb-3 flex-wrap gap-2",
                // `bg-[${colors[key]}]`,
              )}
              style={{ backgroundColor: color }}
            >
              <Text className="px-2">{key.toUpperCase()}</Text>
              <Text
                className={cn("px-2 py-1 bg-white border-2 rounded-lg")}
                style={{ borderColor: color }}
              >
                {value}
              </Text>
            </View>
          );
        })}
      </View>
    </BaseAccordion>
  );
};

export default DeviceData;
