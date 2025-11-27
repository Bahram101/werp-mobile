import { router } from "expo-router";
import { X } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const Magnum = () => {
  return (
    <View className="pt-[55px] flex-1 bg-white">
      <View className="bg-gray-400 flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="bg-white h-full flex-1"> 
            <View className="flex-row justify-between">
              <Text>Magnum</Text>
              <Pressable
                className="bg-grayLight p-2 rounded"
                onPress={() => router.back()}
              >
                <X />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Magnum;
