import { COLORS } from "@/constants/theme";
import { TypeMaterialIconNames } from "@/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { Pressable, Text } from "react-native";

type PaymentOptionProps = {
  label: string;
  icon: TypeMaterialIconNames;
  isActive: boolean;
  onPress: () => void;
};

export function PaymentOption({
  label,
  icon,
  isActive,
  onPress,
}: PaymentOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-1 flex-row items-center justify-center rounded-xl border p-3",
        isActive ? "border-primary bg-green-100" : "border-grayMedium",
      )}
    >
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={isActive ? COLORS.primary : COLORS.grayDark}
      />

      <Text className={cn("ml-2", isActive ? "text-primary" : "text-grayDark")}>
        {label}
      </Text>
    </Pressable>
  );
}
