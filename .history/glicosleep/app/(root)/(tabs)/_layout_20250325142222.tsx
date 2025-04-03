import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js"; // ✅ Importa o tipo User
import icons from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image source={icon} tintColor={focused ? "#0061ff" : "#666876"} resizeMode="contain" className="size-6" />
    <Text className={`${focused ? "text-primary-300 font-rubik-medium" : "text-black-200 font-rubik"} text-xs w-full text-center mt-1`}>
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // ✅ Corrigido

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/sign-in"); // Redireciona para login se não estiver autenticado
      } else {
        setUser(data.user); // ✅ Agora está tipado corretamente
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0061ff" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          backgroundColor: "#E3F2FD",
          borderRadius: 25,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 5,
          height: 75,
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
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.calendar} focused={focused} title="Histórico" />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.person} focused={focused} title="Perfil" />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
