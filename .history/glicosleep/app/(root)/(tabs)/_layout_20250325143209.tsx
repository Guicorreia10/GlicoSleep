import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Image } from "react-native";
import icons from "@/constants/icons";

const _layout = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Simulação de verificação de autenticação (substitua com sua lógica real)
      const isLoggedIn = await new Promise((resolve) => setTimeout(() => resolve(false), 1000)); // Simula autenticação
      setLoading(false);

      if (!isLoggedIn) {
        router.replace("/sign-in"); // Redireciona para a página de login
      } else {
        setAuthenticated(true); // Permite acesso ao restante da aplicação
      }
    };

    checkAuthentication();
  }, [router]);

  if (loading) {
    // Exibe um indicador de carregamento enquanto verifica a autenticação
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0061FF" />
        <Text style={{ marginTop: 10 }}>Verificando autenticação...</Text>
      </View>
    );
  }

  if (!authenticated) {
    return null; // Renderiza nada enquanto o usuário é redirecionado
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
          backgroundColor: "#E3F2FD", // Azul muito mais claro
          borderRadius: 25, // Bordas arredondadas suaves
          borderTopWidth: 0, // Remove borda superior
          shadowColor: "#000", // Sombra leve
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15, // Sombra mais suave
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
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
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

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
  <View style={{ alignItems: "center", marginTop: 5 }}>
    <Image
      source={icon}
      style={{ width: 25, height: 25, tintColor: focused ? "#0061FF" : "#666876" }}
      resizeMode="contain"
    />
    <Text
      style={{
        fontSize: 10,
        color: focused ? "#0061FF" : "#666876",
        textAlign: "center",
        marginTop: 2,
      }}
    >
      {title}
    </Text>
  </View>
);

export default _layout;
