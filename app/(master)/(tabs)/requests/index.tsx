import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const requests = [
  { id: 1, title: "Заявка на " },
  { id: 2, title: "Заявка на ремонт1 sdf asdf" },
  { id: 3, title: "Заявка на ремонт2" },
  { id: 4, title: "Заявка на ремонт3" },
];

export default function Requests() {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f9f9f9" }}>
      {requests.map((req) => (
        <Link
          key={req.id}
          href={{
            pathname: "/requests/[id]",
            params: { id: req.id, title: req.title },
          }}
          asChild
        >
          <TouchableOpacity className="p-4 bg-white mb-3">
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {req.title}
            </Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
