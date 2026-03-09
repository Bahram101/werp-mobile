import Layout from "@/components/ui/main/Layout";
import { MODULES } from "@/config/modules.registry";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  const userInfo = {
    ...user,
    rids: [
      {
        id: 52,
        name: "Начальник отдела Маркетинг",
      },
      {
        id: 620,
        name: "mobile",
      },
      {
        id: 622,
        name: "mobile-marketing",
      },
      {
        id: 623,
        name: "mobile-finance",
      },
    ],
  };

  const roles = userInfo.rids.map((role) => role.name);

  const modules = MODULES.filter((m) => roles.includes(m.role));

  return (
    <Layout header={true}>
      <View className="gap-6">
        {modules.map((module) => (
          <Pressable
            key={module.name}
            onPress={() => router.push(module.route as any)}
            style={{
              padding: 20,
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18 }}>{module.name}</Text>
          </Pressable>
        ))}
      </View>
    </Layout>
  );
}
