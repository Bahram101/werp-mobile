import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type ServicesProps = {
  data: ServiceItem[];
};

const Services = ({ data }: ServicesProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "services",
      {
        data,
        selectedServiceIds,
        handleSelectService,
      },
      { title: "Выбрать услуги", snapPoints: ["60%"] },
    );
  };

  const handleSelectService = (ids: string[]) => {
    setSelectedServiceIds(ids);
    const newSelected = data.filter((item) => ids.includes(String(item.id)));
    setSelectedServices(newSelected);
    updateModalProps({ selectedServiceIds: ids });
  };

  const handleRemoveService = (id: number) => {
    const updated = selectedServices.filter((item) => item.id !== id);
    const updatedIds = updated.map((i) => String(i.id));
    setSelectedServices(updated);
    setSelectedServiceIds(updatedIds);
    updateModalProps({ selectedServiceIds: updatedIds });
  };

  return (
    <View className="work-block bg-white mt-3 rounded-2xl p-4 ">
      <View className="work-block-top pt-2 mb-4 py-3 border-b border-grayLight flex-row justify-between items-center ">
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
      {/* <ServiceTable
        data={selectedServices}
        totalAmount={null}
        handleRemoveService={handleRemoveService}
      /> */}
    </View>
  );
};

export default Services;
