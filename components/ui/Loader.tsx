import cn from "clsx";
import { ActivityIndicator, View } from "react-native";

type Props = {
  color?: string;
};

export const Loader = ({ color }: Props) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="small" className={cn(color || "text-primary")} />
    </View>
  );
};
