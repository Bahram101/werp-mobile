import {
  SelectedSparePartItem,
  SparePartItem,
} from "@/features/master/requests/types";
import { useActionSheet } from "@/providers/ActionSheetProvider";
import { useBottomSheet } from "@/providers/BottomSheet/AppBottomSheetProvider";
import * as Haptics from "expo-haptics";
import { CirclePlus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import SparePartActionSheet from "../SparePartActionSheet";
import SparePartTable from "./SparePartTable";

type SparePartsProps = {
  data: SparePartItem[];
};

const SparePart = ({ data }: SparePartsProps) => {
  const { showBottomSheet, updateModalProps } = useBottomSheet();
  const { openSheet, closeSheet } = useActionSheet();
  const [selectedItems, setSelectedItems] = useState<SelectedSparePartItem[]>(
    [],
  );
  const selectedIds = selectedItems.map((i) => String(i.id));
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
      "spareParts",
      {
        data,
        selectedIds,
        selectedItems,
        handleAddPart,
      },
      { title: "Продажа запчастей", snapPoints: ["80%"] },
    );
  };

  const handleRemoveSparePart = (id: number) => {
    const updated = selectedItems.filter((item) => item.id !== id);
    const updatedIds = updated.map((i) => String(i.id));
    setSelectedItems(updated);
    updateModalProps({ selectedSparePartIds: updatedIds });
  };

  const handleAddPart = (item: SparePartItem, qty: number) => {
    const preparedItem = {
      ...item,
      selectedQty: qty,
      totalPrice: item.price * qty,
    };

    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      const updated = exists
        ? prev.map((p) => (p.id === item.id ? preparedItem : p))
        : [...prev, preparedItem];

      return updated;
    });
  };

  const handlePress = (item: SelectedSparePartItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const existing = selectedItems?.find((p) => p.id === item.id);
    openSheet(
      <SparePartActionSheet
        item={item}
        initialQty={existing?.selectedQty || 1}
        onAdd={(qty) => handleAddPart(item, qty)}
        closeSheet={closeSheet}
      />,
    );
  };

  return (
    <View className="work-block bg-white mt-3 rounded-2xl p-4">
      <View className="work-block-top py-4 pt-2 border-b mb-4 border-grayLight flex-row justify-between items-center">
        <Text className="font-bold text-primary uppercase">
          Продажа запчастей
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

      <SparePartTable
        handlePress={handlePress}
        handleRemoveSparePart={handleRemoveSparePart}
        selectedItems={selectedItems}
        totalAmount={totalAmount}
      />
    </View>
  );
};

export default SparePart;
