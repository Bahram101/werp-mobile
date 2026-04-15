import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { TabBarProps, TabView } from "react-native-tab-view";
import RequestsTabBar from "../../requests/components/RequestsTabBar";
import EquipmentScenes from "../components/EquipmentScenes";

const Equipment = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "report", title: "Отчет" },
    { key: "new", title: "Новые" },
    { key: "closed", title: "Закрытые" },
  ]);

  return (
    <View className="flex-1 pt-2" style={{ position: "relative" }}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={({ route }) => <EquipmentScenes route={route} />}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        removeClippedSubviews={false}
        renderTabBar={(props: TabBarProps<any>) => (
          <RequestsTabBar {...props} />
        )}
      />
    </View>
  );
};

export default Equipment;
