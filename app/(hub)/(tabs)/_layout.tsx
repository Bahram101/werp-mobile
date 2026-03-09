import { mainTabs } from "@/features/navigation/main-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       {mainTabs.map((tab) => {
//         return (
//           <Tabs.Screen
//             key={tab.name}
//             name={tab.name}
//             options={{
//               title: tab.title,
//               headerShown: tab.name === "main" && false,
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialCommunityIcons
//                   name={tab.icon as any}
//                   size={size}
//                   color={color}
//                 />
//               ),
//             }}
//           />
//         );
//       })}
//     </Tabs>
//   );
// }

export default function HubTabs() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      {mainTabs.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={size}
                  color={color}
                />
              ),
              headerShown: tab.name === "main" && false,
            }}
          />
        );
      })}
    </Tabs>
  );
}
