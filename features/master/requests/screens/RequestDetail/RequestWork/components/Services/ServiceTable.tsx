import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/AppBottomSheetProvider";
import { CirclePlus, CircleX } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ServiceModalList from "./ServiceModalList";

type ServiceTableProps = {
  data: ServiceItem[];
};

const ServiceTable = ({ data }: ServiceTableProps) => {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const totalAmount = selectedServices.reduce(
    (acc, item) => acc + item.price,
    0
  );

  useEffect(() => {
    setBottomSheetContent(
      <ServiceModalList
        data={data}
        handleSelectServices={handleSelectServices}
        selectedServiceIds={selectedServiceIds}
      />
    );
  }, [selectedServiceIds]);

  const {
    openBottomSheet,
    setBottomSheetTitle,
    setBottomSheetContent,
    setBottomSheetSnapPoints,
  } = useBottomSheet();

  const handleSelectServices = (ids: string[]) => {
    setSelectedServiceIds(ids);
    const newSelectedServices = data.filter((item) =>
      ids.includes(item.id.toString())
    );
    setSelectedServices(newSelectedServices);
  };

  const handleOpenSelectModal = () => {
    setBottomSheetTitle("Выбрать услуги");
    setBottomSheetSnapPoints(["60%"]);
    openBottomSheet();
  };

  const handleRemoveService = (id: number) => {
    const filteredServices = selectedServices.filter((item) => item.id !== id);
    const newIds = filteredServices.map((item) => String(item.id));
    setSelectedServices(filteredServices);
    setSelectedServiceIds(newIds);
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
              <TouchableOpacity onPress={() => handleRemoveService(item.id)}>
                <CircleX color="red" size="20" />
              </TouchableOpacity>
            </View>
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
