import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function RequestDetailLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={({ navigation, route }) => ({
          // headerShown: false,
          // headerShown: true,
          headerTitle: `Заявка №${(route.params as any)?.appNumber}`,

          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 2 }}
            >
              <Feather name="chevron-left" size={30} color="#000" />
            </Pressable>
          ),

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
              <Text>История</Text>
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name="history/index"
        options={{
          headerShown: true,
          title: "История обслуживания",
        }}
      />

      <Stack.Screen
        name="work/index"
        options={{
          headerShown: true,
          title: "Работы",
        }}
      />
    </Stack>
  );
}
