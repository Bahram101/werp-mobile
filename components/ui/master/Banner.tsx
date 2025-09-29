import cn from "clsx";
import React, { FC } from "react";
import { Dimensions, Text, View } from "react-native";

import { getStatusColor, StatusText } from "@/utils/status.helper";

type Scheme = "red" | "blue" | "green";

type StatItem = {
  id: string;
  title: string;
  value: number;
  scheme: Scheme;
  icon: "doc" | "check" | "card";
};

const DATA: StatItem[] = [
  {
    id: "active",
    title: "Активные заявки на сегодня",
    value: 17,
    scheme: "red",
    icon: "doc",
  },
  {
    id: "done",
    title: "Выпол. заявки на сегодня",
    value: 7,
    scheme: "blue",
    icon: "check",
  },
  {
    id: "total",
    title: "Завершенные заявки на месяц",
    value: 32,
    scheme: "green",
    icon: "card",
  },
];

type Props = {
  className?: string;
  style?: object;
};

const Banner: FC<Props> = ({ className, style }) => {
  const { width } = Dimensions.get("window");
  const H_PADDING = 16;
  const GAP = 12;
  const CARD_WIDTH = (width - H_PADDING * 2 - GAP * 1) / 3;

  return (
    <View
      className={cn('px-4',className)}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
      }}
      {...style}
    >
      <View className="flex-row justify-between bg-white rounded-2xl pt-4 pb-4 ">
        {DATA.map((item, index) => (
          <View
            key={item.id}
            style={{ width: CARD_WIDTH }}
            className={cn(
              `px-3 items-center justify-center border-grayLight`,
              index !== 2 && "border-r"
            )}
          >
            <Text
              className="text-xs mb-2 text-center items-center"
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text
              className={cn(
                "font-bold mt-1 text-5xl",
                getStatusColor(item.id as StatusText)
              )}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Banner;
