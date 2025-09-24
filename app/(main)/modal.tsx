import { Link, router } from "expo-router";
import { Text, View } from "react-native";

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <View className="flex-1 justify-center items-center gap-3 bg-orange-400">
      <View>
        <Text>Modal screen</Text>
      </View>
      {isPresented && <Link href="../">Dismiss modal</Link>}
    </View>
  );
}
