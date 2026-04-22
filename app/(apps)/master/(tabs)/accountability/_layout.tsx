import { ROUTES } from "@/constants/routes";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function AccountabilityLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      {/* список материалов */}
      <Stack.Screen
        name="index"
        options={({ navigation, route }) => {
          return {
            title: "Инвентарь",
            headerRight: () => (
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: ROUTES.ACCOUNTABILITY_CREATE,
                  });
                }}
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Feather name="plus" size={18} color="#000" />
                <Text className="text-sm">Заказать</Text>
              </Pressable>
            ),
          };
        }}
      />
      <Stack.Screen name="[id]/index" options={{ headerShown: true }} />
    </Stack>
  );
}
