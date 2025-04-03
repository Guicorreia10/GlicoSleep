import React from "react";
import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";

// Componente para ícones personalizados nas abas
const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <Image
      source={icon}
      style={{
        tintColor: focused ? "#0061ff" : "#666876",
        width: 24,
        height: 24,
      }}
      resizeMode="contain"
    />
    <Text style={{ color: focused ? "#0061ff" : "#666876", fontSize: 12 }}>{title}</Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index" // O nome "index" corresponde à tela inicial (Home)
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={require("../../assets/icons/home.png")} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore" // O nome "explore" corresponde à tela Explore
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={require("../../assets/icons/explore.png")} focused={focused} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // O nome "profile" corresponde à tela Perfil
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={require("../../assets/icons/profile.png")} focused={focused} title="Perfil" />
          ),
        }}
      />
    </Tabs>
  );
}
