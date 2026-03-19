import { Stack } from "expo-router";

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
        name="[appNumber]"
        options={{
          title: "Заявки",
          headerShown: false,
        }}
        // options={({ navigation, route }) => ({
        //   // headerShown: false,
        //   headerTitle: `Заявка №${(route.params as any)?.appNumber}`,

        //   headerLeft: () => (
        //     <Pressable
        //       onPress={() => navigation.goBack()}
        //       style={{ marginLeft: 2 }}
        //     >
        //       <Feather name="chevron-left" size={30} color="#000" />
        //     </Pressable>
        //   ),

        //   headerRight: () => (
        //     <Pressable
        //       onPress={() =>
        //         router.push({
        //           pathname:
        //             "/(apps)/master/(tabs)/requests/[appNumber]/history",
        //           params: { appNumber: (route.params as any)?.appNumber },
        //         })
        //       }
        //       style={{
        //         marginRight: 12,
        //         flexDirection: "row",
        //         alignItems: "center",
        //         gap: 4,
        //       }}
        //     >
        //       <Feather name="clock" size={18} color="#000" />
        //       <Text>История</Text>
        //     </Pressable>
        //   ),
        // })}
      />
    </Stack>
  );
}
