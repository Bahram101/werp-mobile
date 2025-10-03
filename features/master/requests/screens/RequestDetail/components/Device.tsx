import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import { Text, View } from "react-native";
import { DeviceType } from "../../types";

const DeviceData = ({ data }: { data: DeviceType }) => {
  return (
    <BaseAccordion title="Данные аппарата" icon="alert-circle" value="device">
      <View className="flex-row gap-2">
        <Text>Зав.№:</Text>
        <Text className="font-bold">{data.id}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text>Продукт:</Text>
        <Text className="font-bold">{data.product}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text>CN:</Text>
        <Text className="font-bold">{data.cn}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text>Дата продажи:</Text>
        <Text className="font-bold"> {data.date}</Text>
      </View>
      <View className="flex-row w-full justify-between border-t border-grayLight pt-3 mt-1">
        <View className="flex-row items-center bg-[#E990FF] rounded-lg">
          <Text className="px-2">F1</Text>
          <Text className="px-2 py-1  bg-white border-2 border-[#E990FF] rounded-lg">
            -5
          </Text>
        </View>
        <View className="flex-row items-center bg-[#FFA2A2] rounded-lg">
          <Text className="px-2">F1</Text>
          <Text className="px-2 py-1  bg-white border-2 border-[#FFA2A2] rounded-lg">
            -5
          </Text>
        </View>
        <View className="flex-row items-center bg-[#F8E42E] rounded-lg">
          <Text className="px-2">F1</Text>
          <Text className="px-2 py-1  bg-white border-2 border-[#F8E42E] rounded-lg">
            -5
          </Text>
        </View>
        <View className="flex-row items-center bg-[#36D400] rounded-lg">
          <Text className="px-2">F1</Text>
          <Text className="px-2 py-1  bg-white border-2 border-[#36D400] rounded-lg">
            -5
          </Text>
        </View>
        <View className="flex-row items-center bg-[#4A93FF] rounded-lg">
          <Text className="px-2">F1</Text>
          <Text className="px-2 py-1  bg-white border-2 border-[#4A93FF] rounded-lg">
            -5
          </Text>
        </View>
      </View>
    </BaseAccordion>
  );
};

export default DeviceData;
