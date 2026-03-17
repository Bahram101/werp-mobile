import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus, EllipsisVertical } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

type ServicesProps = {
  data: ServiceItem[];
};

const Services = ({ data }: ServicesProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();

  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const totalAmount = selectedServices.reduce(
    (acc, item) => acc + item.price,
    0,
  );

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "services",
      {
        data,
        selectedServiceIds,
        handleSelectServices,
      },
      { title: "Выбрать услуги", snapPoints: ["60%"] },
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
    <View className="work-block bg-white mt-3 rounded-2xl p-4">
      <View className="work-block-top pb-4 pt-2 border-b mb-4 border-grayLight flex-row justify-between">
        <Text className="font-bold text-primary uppercase">Услуги</Text>
        <View>
          <Pressable
            className="flex-1 text-center flex-row justify-center"
            onPress={handleOpenSelectModal}
          >
            <CirclePlus color="green" size={20} />
          </Pressable>
        </View>
      </View>

      <View className="table">
        <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
          <View className="table-head-col w-[10%]">
            <Text className="font-semibold">№</Text>
          </View>
          <View className="table-head-col w-[60%]">
            <Text className="font-semibold">Название усл</Text>
          </View>
          <View className="table-head-col w-[23%]">
            <Text className="font-semibold">Сумма</Text>
          </View>
          <View className="table-head-col w-[7%]"></View>
        </View>

        <View className="table-body flex-col">
          {selectedServices.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center border-b border-grayLight py-3"
            >
              <Text className="w-[10%] text-center">{item.id}</Text>
              <Text className="w-[60%] text-center">{item.name}</Text>
              <Text className="w-[23%] text-center">{item.price}</Text>
              <View className="w-[7%]">
                <TouchableOpacity>
                  <EllipsisVertical />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View className="flex-row justify-end pt-3">
          <Text>{`Итог: ${totalAmount}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default Services;
