import BaseAccordion from "@/components/ui/accordion/BaseAccordion";
import React from "react";
import { Text, View } from "react-native";

type DocInfoProps = {
  data: any;
};

const DocInfo = ({ data }: DocInfoProps) => {
  const fullName = data.userInfo.currentStaff.fio;
  const bukrs = data.userInfo.bukrs[0].id;
  const bukrsName = data.userInfo.bukrs[0].name;
  const branchName = data.userInfo.service[bukrs ?? ""][0]?.text;
  const position = data.userInfo.currentStaff.positions[0].name;

  return (
    <BaseAccordion title="Информация о пользователя" icon="info" value="info">
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Ф.И.О:</Text>
        <Text className="font-semibold">{fullName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Компания:</Text>
        <Text className="font-semibold">{bukrsName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Филиал:</Text>
        <Text className="font-semibold">{branchName}</Text>
      </View>
      <View className="flex-row gap-2">
        <Text className="text-gray-500">Должность:</Text>
        <Text className="font-semibold">{position}</Text>
      </View>
    </BaseAccordion>
  );
};

export default DocInfo;
