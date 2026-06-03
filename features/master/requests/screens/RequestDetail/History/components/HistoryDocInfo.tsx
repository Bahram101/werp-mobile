import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import React from "react";
import { Text, View } from "react-native";

type DocInfoProps = {
  data: any;
};

const DocInfo = ({ data }: DocInfoProps) => {
  return (
    <BaseAccordion title="Информация о документа" icon="info" value="info">
      <View className="flex-row gap-2">
        <Text className="text-gray-500">№ Сервиса:</Text>
        <Text className="font-semibold">{data?.id}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Статус сервиса:</Text>
        <Text className="font-semibold">{data?.serviceStatusName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">№ Заявки:</Text>
        <Text className="font-semibold">{data?.applicationNumber}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Компания:</Text>
        <Text className="font-semibold">{data?.bukrsName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Филиал:</Text>
        <Text className="font-semibold">{data?.branchName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Заводской номер:</Text>
        <Text className="font-semibold">{data?.tovarSn}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">CN:</Text>
        <Text className="font-semibold">{data?.contractNumber}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Адрес:</Text>
        <Text className="font-semibold">{data?.address}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Дата покупки:</Text>
        <Text className="font-semibold">{data?.contractDate}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Мастер:</Text>
        <Text className="font-semibold">{data?.masterFullName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Оператор:</Text>
        <Text className="font-semibold">{data?.operatorFullName}</Text>
      </View>
    </BaseAccordion>
  );
};

export default DocInfo;
