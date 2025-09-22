import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthService } from "@/features/auth/services/auth.service";
import React from "react";
import { Text, View } from "react-native";

export default function Home() {
  const { setUser } = useAuth();
  const logout = () => {
    AuthService.logout().then(() => setUser(null));
  };

  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text>Home pagee</Text>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
