import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Messages() {
  const messages = [
    {
      id: "1",
      title: "Сервис",
      description: "Описание уведомления",
      date: "Сегодня",
    },
    {
      id: "2",
      title: "Финансы",
      description: "Описание уведомления",
      date: "Сегодня",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f9f9f9" }}>
      {messages.map((msg) => (
        <Link key={msg.id} href={`/messages/${msg.id}`} asChild>
          <TouchableOpacity
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderColor: "#ddd",
              backgroundColor: "white",
              marginBottom: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {msg.title}
            </Text>
            <Text style={{ color: "gray" }}>{msg.description}</Text>
            <Text style={{ color: "gray", marginTop: 4, textAlign: "right" }}>
              {msg.date}
            </Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
