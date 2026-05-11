import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function PaymentSuccessScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="flex-1 p-4">
        <View className="flex-1 gap-6 items-center justify-center">
          <View className="flex-col gap-3 items-center">
            <View className="h-40 w-40 items-center justify-center rounded-full border-4 border-primary">
              <View className="h-28 w-28 items-center justify-center rounded-full bg-primary">
                <Ionicons name="checkmark" size={58} color="white" />
              </View>
            </View>

            <Text className="text-4xl font-bold text-black">Успешно!</Text>

            <Text className="text-center text-xl text-neutral-500">
              Счет успешно оплачен
            </Text>
          </View>

          <AnimatedButton
            bg="primary"
            bgPressed="primaryDark"
            textColor="white"
            onPress={() => router.push(ROUTES.REQUESTS)}
          >
            Вернуться на главную
          </AnimatedButton>
        </View>
      </View>
    </>
  );
}
