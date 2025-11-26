import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus, CircleX } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ServiceTableProps = {
  data: ServiceItem[];
};

const ServiceTable = ({ data }: ServiceTableProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();

  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const totalAmount = selectedServices.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "services",
      {
        data,
        selectedServiceIds,
        handleSelectServices,
      },
      { title: "Выбрать услуги", snapPoints: ["60%"] }
    );
  };

  const handleSelectServices = (ids: string[]) => {
    setSelectedServiceIds(ids);
    const newSelected = data.filter((item) => ids.includes(String(item.id)));
    setSelectedServices(newSelected);
    updateModalProps({ selectedServiceIds: ids });
  };

  const handleRemoveService = (id: number) => {
    const updated = selectedServices.filter((item) => item.id !== id);
    setSelectedServices(updated);
    setSelectedServiceIds(updated.map((i) => String(i.id)));
    updateModalProps({ selectedServiceIds: String(id) });
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
          <TouchableOpacity onPress={handleOpenSelectModal}>
            <CirclePlus color="green" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="table-body flex-col">
        {selectedServices.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center border-b border-grayLight py-3"
          >
            <Text className="w-[10%] text-center">{item.id}</Text>
            <Text className="w-[50%] text-center">{item.name}</Text>
            <Text className="w-[20%] text-center">{item.price}</Text>
            <TouchableOpacity
              className="w-[20%] items-center"
              onPress={() => handleRemoveService(item.id)}
            >
              <CircleX color="red" size={20} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className="flex-row justify-end pt-3">
        <Text>{`Итог: ${totalAmount}`}</Text>
      </View>
    </View>
  );
};

export default ServiceTable;
