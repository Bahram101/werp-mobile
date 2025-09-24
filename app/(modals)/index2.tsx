import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center gap-3">
      <View>
        <Text>Home screen</Text>
      </View>
      <Link href="/modal">Open modal</Link>
    </View>
  );
}
