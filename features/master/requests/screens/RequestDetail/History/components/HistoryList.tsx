import React from "react";
import HistoryItem from "./HistoryItem";

type Props = {
  data: any;
  onPressItem: (item: any) => void;
};

const HistoryList = ({ data, onPressItem }: Props) => {
  return data?.map((item: any, index: number) => (
    <HistoryItem
      key={index}
      item={item}
      onPressItem={onPressItem}
      isLast={index === data.length - 1}
    />
  ));
};

export default HistoryList;
