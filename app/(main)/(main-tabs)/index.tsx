import { Button } from "@/components/ui/button";
import Layout from "@/components/ui/main/Layout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthService } from "@/features/auth/services/auth.service";
import React from "react";
import { Text } from "react-native";

export default function Home() {
  const { setUser } = useAuth();
  const logout = () => {
    AuthService.logout().then(() => setUser(null));
  };

  return (
    <Layout header={true}>
      <Text>
        Home pagee asdf asdfalskdfa a;sdlkfjasdlkfja asldkf ja lsd ka;s sldkfs
        a;lskdfjas dfl asdfas d
      </Text>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </Layout>
  );
}
