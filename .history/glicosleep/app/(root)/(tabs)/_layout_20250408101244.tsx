import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase"; // Certifique-se de que o caminho está correto
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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verifica a sessão no Supabase
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          setIsAuthenticated(true); // Usuário autenticado
        } else {
          setIsAuthenticated(false); // Redireciona para login
          router.replace("/sign-in");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.replace("/sign-in"); // Redireciona em caso de erro
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    // Exibe um carregamento enquanto verifica autenticação
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    // Bloqueia a renderização dos tabs até que o usuário esteja autenticado
    return null;
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
