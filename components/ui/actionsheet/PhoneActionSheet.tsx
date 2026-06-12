import { FontAwesome } from "@expo/vector-icons";
import { Linking, Pressable, Text, View } from "react-native";

type Props = {
  phones: string[];
};

export default function PhoneActionSheet({ phones }: Props) {
  const callPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View className="w-full p-4">
      <Text className="text-lg font-semibold mb-4">Телефоны клиента</Text>

      {phones.map((phone) => (
        <Pressable
          key={phone}
          onPress={() => callPhone(phone)}
          className="rounded-md active:bg-gray-100"
        >
          <View className="flex-row items-center gap-2">
            <FontAwesome name="phone" size={22} color="green" />
            <Text className="px-2 py-4 pl-0">{phone}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
