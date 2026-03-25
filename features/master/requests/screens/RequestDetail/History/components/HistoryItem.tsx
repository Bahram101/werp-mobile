import { formatFullDate } from "@/utils/date";
import cn from "clsx";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
type Props = {
  isLast?: boolean;
  item: any;
  onPressItem: (item: any) => void;
};

const HistoryItem = ({ isLast, item, onPressItem }: Props) => {
  return (
    <TouchableOpacity
      key={item.id}
      className={cn(
        "border-grayLight pt-3 flex-row justify-between items-center",
        !isLast && "border-b pb-3",
      )}
      onPress={() => onPressItem(item)}
    >
      <Text className="text-lg">{formatFullDate(item.crmHistoryDate)}</Text>
      <ChevronRight size={20} />
    </TouchableOpacity>
  );
};

export default HistoryItem;
