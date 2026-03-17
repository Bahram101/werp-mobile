import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable } from "react-native";

export default function ReqeustWorkLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[applicationNumber]"
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 2 }}
            >
              <Feather name="chevron-left" size={30} color="#000" />
            </Pressable>
          ),
        })}
      />
    </Stack>
  );
}
