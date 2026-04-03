import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ServiceTable from "./ServiceTable";

type ServicesProps = {
  data: ServiceItem[];
};

const Services = ({ data }: ServicesProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();

  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // const totalAmount = selectedServices.reduce(
  //   (acc, item) => acc + item.code,
  //   0,
  // );

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

  console.log("selectedServiceIds", selectedServiceIds);

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
      <ServiceTable data={selectedServices} totalAmount={null} />
    </View>
  );
};

export default Services;
