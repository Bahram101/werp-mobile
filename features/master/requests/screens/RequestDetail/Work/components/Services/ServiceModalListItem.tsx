import {
  SelectedMatnrItem,
  ServiceItem,
} from "@/features/master/requests/types";
import { strToLowerCase } from "@/utils/helpers";
import cn from "clsx";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  item: ServiceItem;
  isSelected: boolean;
  isLast?: boolean;
  selectedItems: SelectedMatnrItem[];
  onAddPart: (item: any) => void;
};

const ServiceModalListItem = ({
  item,
  isSelected,
  isLast,
  selectedItems,
  onAddPart,
}: Props) => {
  return (
    <Pressable onPress={() => onAddPart(item)}>
      <View
        className={cn(
          "py-3 flex-row items-center justify-between px-4",
          !isLast && "border-b border-grayLight",
          isSelected && "bg-green-100",
        )}
      >
        <View className="flex-row items-center gap-2">
          <View>
            <Text
              className="text-base text-gray-900 font-medium"
              numberOfLines={1}
            >
              {strToLowerCase(item.name)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceModalListItem;
