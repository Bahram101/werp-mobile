import { ScrollView, Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 230 }}
      >
        <View className="mt-5 flex-1 px-4">
          <Text>Сервис</Text>
        </View>
      </ScrollView>
    </View>
  );
}
