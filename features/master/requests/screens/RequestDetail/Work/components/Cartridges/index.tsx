import { COLORS } from "@/constants/theme";
import {
  CartridgeItem,
  SelectedCartridgeItem,
} from "@/features/master/requests/types";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import * as Haptics from "expo-haptics";
import { CirclePlus, Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import SparePartActionSheet from "../SpareParts/SparePartActionSheet";

type SparePartsProps = {
  data: CartridgeItem[];
};

const SparePart = ({ data }: SparePartsProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();
  const { openSheet, closeSheet } = useActionSheet();

  const [selectedItems, setSelectedItems] = useState<SelectedCartridgeItem[]>(
    [],
  );

  const selectedIds = selectedItems.map((i) => String(i.index));

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );

  useEffect(() => {
    updateModalProps({
      selectedIds,
      selectedItems,
    });
  }, [selectedItems, selectedIds, updateModalProps]);

  const handleOpenSelectModal = () => {
    showBottomSheet(
      "cartridges",
      {
        data,
        selectedIds,
        selectedItems,
        handleAddPart,
      },
      { title: "Продажа картриджей", snapPoints: ["50%"] },
    );
  };

  const handleRemoveSparePart = (id: number) => {
    const updated = selectedItems.filter((item) => item.index !== id);
    const updatedIds = updated.map((i) => String(i.index));
    setSelectedItems(updated);
    updateModalProps({ selectedSparePartIds: updatedIds });
  };

  const handleAddPart = (item: CartridgeItem, qty: number) => {
    const preparedItem = {
      ...item,
      selectedQty: qty,
      totalPrice: item.price * qty,
    };

    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.index === item.index);

      const updated = exists
        ? prev.map((p) => (p.index === item.index ? preparedItem : p))
        : [...prev, preparedItem];

      return updated;
    });
  };

  const handlePress = (item: SelectedCartridgeItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const existing = selectedItems?.find((p) => p.index === item.index);
    openSheet(
      <SparePartActionSheet
        item={item}
        initialQty={existing?.selectedQty || 1}
        onAdd={(qty) => handleAddPart(item, qty)}
        closeSheet={closeSheet}
      />,
    );
  };

  console.log("selectedItems", JSON.stringify(selectedItems, null, 2));
  console.log("selectedIds", selectedIds);

  return (
    <View className="work-block bg-white mt-3 rounded-2xl p-4">
      <View className="work-block-top py-4 pt-2 border-b mb-4 border-grayLight flex-row justify-between items-center">
        <Text className="font-bold text-primary uppercase">
          Продажа картриджей
        </Text>
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
          <View className="table-head-col w-[8%]">
            <Text className="font-semibold">№</Text>
          </View>
          <View className="table-head-col w-[50%]">
            <Text className="font-semibold">Название</Text>
          </View>
          <View className="table-head-col w-[15%]">
            <Text className="font-semibold">Кол.</Text>
          </View>
          <View className="table-head-col w-[20%]">
            <Text className="font-semibold">Сумма</Text>
          </View>
          <View className="table-head-col w-[7%]"></View>
        </View>
        <View className="table-body flex-col">
          {selectedItems.map((item) => (
            <TouchableOpacity
              key={item.index}
              className="flex-row justify-between items-center border-b border-grayLight py-3 active:opacity-70"
              onPress={() => handlePress(item)}
            >
              <Text className="w-[8%] text-center">{item.fno}</Text>
              <Text className="w-[50%] text-center">{item.matnrName}</Text>
              <Text className="w-[15%] text-center">{item.selectedQty}</Text>
              <Text className="w-[20%] text-center">{item.totalPrice}</Text>
              <View className="w-[7%] p-1 items-center justify-center">
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    handleRemoveSparePart(item.index);
                  }}
                >
                  <Trash2 size={18} color={COLORS.red} />
                </Pressable>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-end pt-3">
          <Text>{`Итог: ${totalAmount}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default SparePart;
