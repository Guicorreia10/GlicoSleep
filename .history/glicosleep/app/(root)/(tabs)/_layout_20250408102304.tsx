import React from "react";
import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import icons from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061ff" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${
        focused ? "text-primary-300 font-rubik-medium" : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          backgroundColor: "#E3F2FD", // Azul claro
          borderRadius: 25,
          borderTopWidth: 0, // Remove borda superior
          shadowColor: "#000", // Sombra leve
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15, // Sombra suave
          shadowRadius: 10,
          elevation: 5, // Sombra para Android
          height: 75, // Altura ajustada
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.home} focused={focused} title="Home" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Histórico",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.calendar} focused={focused} title="Histórico" />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Perfil" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
