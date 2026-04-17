import { strToLowerCase } from "@/utils/helpers";
import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";

type TableProps = {
  data: any;
};

const Table = ({ data }: TableProps) => {
  return (
    <View className="table">
      <View className="table-header flex-row justify-between border-b border-grayLight pb-3">
        <View className="table-head-col w-[30%]">
          <Text className="font-semibold">Код</Text>
        </View>
        <View className="table-head-col w-[55%]">
          <Text className="font-semibold">Название</Text>
        </View>
        <View className="table-head-col w-[15%]">
          <Text className="font-semibold">Кол.</Text>
        </View>
      </View>
      <View className="table-body flex-col">
        {data.items.map((item: any, index: number) => (
          <View
            key={item.matnr}
            className={cn(
              "flex-row justify-between items-center border-grayLight py-3 active:opacity-70",
              index !== data.items.length - 1 && "border-b",
            )}
          >
            <Text className="w-[30%] text-center">{item.matnrCode}</Text>
            <Text className="w-[55%] text-center">
              {strToLowerCase(item.matnrName)}
            </Text>
            <Text className="w-[15%] text-center">{item.quantity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Table;
