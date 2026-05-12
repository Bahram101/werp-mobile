import cn from "clsx";
import { JSX } from "react";
import { Controller } from "react-hook-form";

import { Input, InputField } from "../input";

import { formatNumber } from "@/utils/helpers";
import { Text, View } from "react-native";
import { IField } from "./field.interface";

export const Field = <T extends Record<string, any>>({
  control,
  rules,
  name,
  className,
  isCurrency,
  currencyName,
  ...rest
}: IField<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <>
            <Input
              className={cn(
                "h-[45px] pl-2",
                error ? "border-red" : "border-[#D6D1D2]",
                className,
              )}
            >
              <InputField
                placeholderTextColor="#fff"
                autoCapitalize="none"
                onBlur={onBlur}
                value={
                  isCurrency
                    ? formatNumber((value || "").toString())
                    : (value || "").toString()
                }
                onChangeText={(text) => {
                  if (isCurrency) {
                    const cleaned = text.replace(/[^0-9]/g, "");
                    onChange(cleaned);
                  } else {
                    onChange(text);
                  }
                }}
                {...rest}
              />
              {isCurrency && (
                <View className="bg-grayMedium px-2 h-14 rounded-tr-xl items-center justify-center">
                  <Text className="text-white font-semibold">
                    {currencyName}
                  </Text>
                </View>
              )}
            </Input>
            {error && <Text className="text-red">{error.message}</Text>}
          </>
        );
      }}
    />
  );
};
