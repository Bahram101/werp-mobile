import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/AppBottomSheetProvider";
import { CirclePlus, CircleX } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ServiceModalList from "./ServiceModalList";

type ServiceTableProps = {
  data: ServiceItem[];
};

const ServiceTable = ({ data }: ServiceTableProps) => {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);

  const selectedIds = selectedServices.map((s) => String(s.id));

  const totalPrice = selectedServices.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const {
    openBottomSheet,
    setBottomSheetTitle,
    setBottomSheetContent,
    setBottomSheetSnapPoints,
  } = useBottomSheet();

  const onSelect = (selectedIds: string[]) => {
    const selected = data.filter((item) =>
      selectedIds.includes(item.id.toString())
    );
    setSelectedServices(selected);
  };

  const onAdd = () => {
    setBottomSheetTitle("Выбрать услуги");
    setBottomSheetContent(
      <ServiceModalList
        key={selectedIds.join(",")}
        data={data}
        onSelect={onSelect}
        selectedIds={selectedIds}
      />
    );
    setBottomSheetSnapPoints(["45%"]);
    openBottomSheet();
  };

  const onDelete = (id: number) => {
    setSelectedServices((prev) => prev.filter((item) => item.id !== id));
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
        {selectedServices.map((item) => (
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
              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <CircleX color="red" size="20" />
              </TouchableOpacity>
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
