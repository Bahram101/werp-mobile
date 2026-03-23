import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function RequestsLayout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: true,
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Заявки",
          headerShown: true, // список заявок
        }}
      />
      <Stack.Screen
        name="[appNumber]/index"
        options={({ navigation, route }) => ({
          headerRight: () => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname:
                    "/(apps)/master/(tabs)/requests/[appNumber]/history",
                  params: { appNumber: (route.params as any)?.appNumber },
                })
              }
              style={{
                marginRight: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Feather name="clock" size={18} color="#000" />
              <Text className="text-sm">История</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="[appNumber]/history/index.tsx"
        options={{
          title: "История",
          headerShown: true, // список заявок
        }}
      />
    </Stack>
  );
}
