import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/AppBottomSheetProvider";
import { CirclePlus, CircleX } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ServiceTableProps = {
  data: ServiceItem[];
  totalPrice: number;
};

const ServiceTable = ({ data, totalPrice }: ServiceTableProps) => {
  const {
    openBottomSheet,
    setBottomSheetTitle,
    setBottomSheetContent,
    setBottomSheetSnapPoints,
  } = useBottomSheet();

  const onAdd = () => {
    setBottomSheetTitle("Выбрать услуги");
    setBottomSheetSnapPoints(["75%"]);
    setBottomSheetContent(
      <View>
        <Text>Форма добавления услуги</Text>
      </View>
    );
    openBottomSheet();
  };

  return (
    <View className="table">
      <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
        <View className="table-head-col w-[10%]">
          <Text className="font-semibold">№</Text>
        </View>
        <View className="table-head-col w-[50%]">
          <Text className="font-semibold">Название усл</Text>
        </View>
        <View className="table-head-col w-[20%]">
          <Text className="font-semibold">Сумма</Text>
        </View>
        <View className="table-head-col w-[20%] border-r border-grayLight">
          <TouchableOpacity onPress={onAdd}>
            <CirclePlus color="green" size="20" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="table-body flex-col">
        {data.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center border-b border-grayLight py-3"
          >
            <View className="justify-center flex-row w-[10%]">
              <Text>{item.id}</Text>
            </View>
            <View className="justify-center flex-row w-[50%]">
              <Text>{item.name}</Text>
            </View>
            <View className="justify-center flex-row w-[20%]">
              <Text>{item.price}</Text>
            </View>
            <View className="justify-center flex-row w-[20%]">
              <CircleX color="red" size="20" />
            </View>
          </View>
        ))}
      </View>
      <View className="flex-row justify-end pt-3">
        <Text>{`Итог: ${totalPrice}`}</Text>
      </View>
    </View>
  );
};

export default ServiceTable;
