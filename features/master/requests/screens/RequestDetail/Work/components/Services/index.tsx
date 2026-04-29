import { usePositioniSum } from "@/features/master/requests/hooks/useService";
import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ServiceTable from "./ServiceTable";

type ServicesProps = {
  data: ServiceItem[];
};

const Services = ({ data }: ServicesProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const lastId =
    selectedServiceIds.length > 0
      ? Number(selectedServiceIds[selectedServiceIds.length - 1])
      : undefined;

  const { positionSum, isLoading } = usePositioniSum(lastId);

  useEffect(() => {
    if (!positionSum) return;
    setSelectedServices((prev) =>
      prev.map((item) =>
        Number(item.id) === positionSum.serviceTypeId
          ? { ...item, price: positionSum.sum }
          : item,
      ),
    );
  }, [positionSum]);

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

    setSelectedServices((prev) => {
      return data
        .filter((item) => ids.includes(String(item.id)))
        .map((item) => {
          const oldItem = prev.find((s) => s.id === item.id);
          return oldItem || item;
        });
    });

    updateModalProps({
      selectedServiceIds: ids,
    });
  };

  const handleRemoveService = (id: number) => {
    const updatedServices = selectedServices.filter(
      (item) => Number(item.id) !== Number(id),
    );
    setSelectedServices(updatedServices);

    const updatedIds = updatedServices.map((i) => String(i.id));
    setSelectedServiceIds(updatedIds);
    // updateModalProps({ selectedServiceIds: updatedIds });
  };

  console.log("selectedServices", JSON.stringify(selectedServices, null, 2));
  console.log(
    "selectedServiceIds",
    JSON.stringify(selectedServiceIds, null, 2),
  );

  return (
    <View className="bg-white rounded-2xl p-4 ">
      <View className="pt-2 mb-4 py-3 border-b border-grayLight flex-row justify-between items-center ">
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
      <ServiceTable
        data={selectedServices}
        handleRemoveService={handleRemoveService}
      />
    </View>
  );
};

export default Services;
