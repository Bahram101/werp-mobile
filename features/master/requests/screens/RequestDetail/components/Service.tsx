import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { Text, View } from "react-native";
import { ServiceType } from "../../../types";

export function Service({ data }: { data: ServiceType }) {
  return (
    <BaseAccordion title="Вид сервиса" icon="settings" value="service">
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Тип:</Text>
        <Text className="font-semibold">{data.type}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Примечание:</Text>
        <Text className="font-semibold">{data.info || "-"}</Text>
      </View>
    </BaseAccordion>
  );
}
