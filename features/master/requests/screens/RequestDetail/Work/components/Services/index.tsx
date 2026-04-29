import { usePositioniSum } from "@/features/master/requests/hooks/useService";
import { ServiceItem } from "@/features/master/requests/types";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import { CirclePlus } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import ServiceTable from "./ServiceTable";

type ServicesProps = {
  data: ServiceItem[];
  selectedItems: ServiceItem[];
  setSelectedItems: Dispatch<SetStateAction<ServiceItem[]>>;
};

const Services = ({ data, selectedItems, setSelectedItems }: ServicesProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();

  const selectedIds = selectedItems.map((i) => String(i.id));

  const lastId =
    selectedIds.length > 0
      ? Number(selectedIds[selectedIds.length - 1])
      : undefined;

  const { positionSum, isLoading } = usePositioniSum(lastId);

  useEffect(() => {
    updateModalProps({
      selectedIds,
      // selectedItems,
    });
  }, [selectedIds, updateModalProps]);

  useEffect(() => {
    if (!positionSum) return;

    setSelectedItems((prev) =>
      prev.map((item) =>
        Number(item.id) === positionSum.serviceTypeId
          ? { ...item, price: positionSum.sum }
          : item,
      ),
    );
  }, [positionSum, setSelectedItems]);

  // const handleAddPart = (item: ServiceItem) => {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  //   console.log("item", JSON.stringify(item, null, 2));
  //   const preparedItem = {
  //     ...item,
  //     // selectedQty: qty,
  //     // totalPrice: item.price * qty,
  //   };

  //   setSelectedItems((prev) => {
  //     const exists = prev.find((p) => p.id === item.id);
  //     const updated = exists
  //       ? prev.map((p) => (p.id === item.id ? preparedItem : p))
  //       : [...prev, preparedItem];

  //     return updated;
  //   });
  // };

  const handleAddPart = (item: ServiceItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) return prev;

      return [...prev, item];
    });
  };

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "services",
      {
        data,
        selectedIds: [...selectedIds], // важно
        handleAddPart,
      },
      {
        title: "Выбрать услуги",
        snapPoints: ["40%"],
      },
    );
  };

  const handleRemoveService = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  console.log("selectedItems", JSON.stringify(selectedItems, null, 2));

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
      <ServiceTable
        data={selectedItems}
        isLoading={isLoading}
        handleRemoveService={handleRemoveService}
      />
    </View>
  );
};

export default Services;
