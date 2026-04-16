import { ROUTES } from "@/constants/routes";
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
      {/* список заявок */}
      <Stack.Screen
        name="index"
        options={{
          title: "Заявки",
          headerShown: true,
        }}
      />

      {/* детальная заявка */}
      <Stack.Screen
        name="[appNumber]/index"
        options={({ navigation, route }) => {
          return {
            headerRight: () => (
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: ROUTES.REQUEST_HISTORY,
                    params: {
                      appNumber: (route.params as any)?.appNumber,
                      contractNumber: (route.params as any)?.contractNumber,
                    },
                  } as any);
                }}
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
          };
        }}
      />

      {/* список истории */}
      <Stack.Screen
        name="[appNumber]/history/index"
        options={{
          title: "История",
          headerShown: true,
        }}
      />

      {/* детальная история */}
      <Stack.Screen
        name="[appNumber]/history/[historyId]"
        options={{
          title: "Детальная история",
          headerShown: true,
        }}
      />

      {/* создание сервис карочку */}
      <Stack.Screen
        name="[appNumber]/work/index"
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.pop(2)}>
              <Feather name="chevron-left" size={28} className="pl-1" />
            </Pressable>
          ),
        })}
      />
    </Stack>
  );
}
