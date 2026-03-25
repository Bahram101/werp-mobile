import { formatFullDate } from "@/utils/date";
import cn from "clsx";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  data: any;
  onPressItem: (item: any) => void;
};

const HistoryList = ({ data, onPressItem }: Props) => {
  return data?.map((item: any, index: number) => (
    <TouchableOpacity
      key={item.id}
      className={cn(
        "border-grayLight pt-3 flex-row justify-between items-center",
        data.length - 1 !== index && "border-b pb-3",
      )}
      onPress={onPressItem}
    >
      <Text className="text-lg">{formatFullDate(item.crmHistoryDate)}</Text>
      <ChevronRight size={20} />
    </TouchableOpacity>
  ));
};

export default HistoryList;
