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
        <Text className="text-gray-500">№:</Text>
        <Text className="font-semibold">{data?.regNumber}</Text>
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
        <Text className="text-gray-500">Склад отправитель:</Text>
        <Text className="font-semibold">{data?.fromWerksName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Тип:</Text>
        <Text className="font-semibold">{data?.typeName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Подотчетник:</Text>
        <Text className="font-semibold">{data?.responsibleName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Отдел:</Text>
        <Text className="font-semibold">{data?.departmentName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Дата создания:</Text>
        <Text className="font-semibold">{data?.createdAt}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Статус:</Text>
        <Text className="font-semibold">{data?.statusName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Примечание:</Text>
        <Text className="font-semibold">{data?.note}</Text>
      </View>
    </BaseAccordion>
  );
};

export default DocInfo;
