import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function PaymentSuccessScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="flex-1 items-center justify-center p-4">
        <View className="items-center">
          <View className="h-40 w-40 items-center justify-center rounded-full border-4 border-green-600">
            <View className="h-28 w-28 items-center justify-center rounded-full bg-green-600">
              <Ionicons name="checkmark" size={58} color="white" />
            </View>
          </View>

          <Text className="mt-10 text-4xl font-bold text-black">Успешно!</Text>

          <Text className="mt-3 text-center text-xl text-neutral-500">
            Счет успешно оплачен
          </Text>
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: ROUTES.REQUESTS,
            })
          }
          className="absolute bottom-10 w-full rounded-2xl bg-green-600 py-4 active:opacity-80"
        >
          <Text className="text-center text-lg font-semibold text-white">
            Вернуться на главную
          </Text>
        </Pressable>
      </View>
    </>
  );
}
