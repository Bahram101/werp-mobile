import Layout from "@/components/ui/main/Layout";
import { MODULES } from "@/config/modules.registry";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  const roles: string[] =
    user?.userInfo?.currentStaff?.roles?.map((role: any) => role.name) || [];

  const modules = MODULES.filter((m) => roles.includes(m.role));

  return (
    <Layout header={true}>
      <View className="gap-6">
        {modules.length > 0 ? (
          modules.map((module) => (
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
          ))
        ) : (
          <View className="items-center justify-center p-6">
            <Text className="text-base text-gray-500 text-center">
              Доступные разделы не найдены
            </Text>
          </View>
        )}
      </View>
    </Layout>
  );
}
