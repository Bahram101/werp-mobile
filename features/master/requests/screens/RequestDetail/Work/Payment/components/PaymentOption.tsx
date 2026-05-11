import { COLORS } from "@/constants/theme";
import { TypeMaterialIconNames } from "@/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { Pressable, Text } from "react-native";

type PaymentOptionProps = {
  label: string;
  icon: TypeMaterialIconNames;
  isActive: boolean;
  method?: "cash" | "card";
  isSplit?: boolean;
  onPress: () => void;
};

export function PaymentOption({
  label,
  icon,
  isActive,
  method,
  isSplit,
  onPress,
}: PaymentOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-1 flex-row items-center justify-center rounded-xl border p-3",
        isActive || isSplit
          ? "border-primary bg-green-100"
          : "border-grayMedium",
      )}
    >
      <MaterialCommunityIcons
        name={icon}
        size={method === "cash" ? 25 : 19}
        color={isActive || isSplit ? COLORS.primary : COLORS.grayDark}
      />

      <Text
        className={cn(
          "ml-2",
          isActive || isSplit ? "text-primary" : "text-grayDark",
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
