import { Accordion } from "@/components/ui/accordion";
import Layout from "@/components/ui/master/Layout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import React from "react";
import { ScrollView } from "react-native";
import DocInfo from "./components/DocInfo";
import SecuritySettings from "./components/SecuritySettings";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Accordion
          type="multiple"
          defaultValue={["info"]}
          className="rounded-2xl gap-3 bg-transparent"
        >
          <DocInfo data={user} />
          <SecuritySettings />
        </Accordion>
      </ScrollView>
    </Layout>
  );
};

export default Profile;
