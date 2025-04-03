import { View, Text, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import icons from "@/constants/icons";
import { supabase } from "../../../lib/supabase"; // Ajuste o caminho para sua configuração do Supabase.

const TabsLayout = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false); // Estado de autenticação
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const checkAuthentication = async () => {
      // Busca a sessão ativa do usuário
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        // Se não houver sessão, redireciona para login
        router.replace('/sign-in');
      } else {
        setAuthenticated(true); // Define como autenticado
      }

      setLoading(false); // Finaliza carregamento
    };

    checkAuthentication();
  }, [router]);

  if (loading) {
    // Mostra carregador enquanto verifica autenticação
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0061FF" />
        <Text>Verificando autenticação...</Text>
      </View>
    );
  }

  if (!authenticated) {
    // Evita renderizar abas enquanto autenticação não for validada
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          backgroundColor: '#E3F2FD', // Azul muito mais claro
          borderRadius: 25, // Bordas arredondadas suaves
          borderTopWidth: 0, // Remove borda superior
          shadowColor: '#000', // Sombra leve
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15, // Sombra mais suave
          shadowRadius: 10,
          elevation: 5, // Sombra para Android
          height: 75, // Altura ajustada
        },
      }}
    >
      {/* Aba Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#0061FF" : "#666876",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Aba Histórico */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.calendar}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#0061FF" : "#666876",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Aba Perfil */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.person}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#0061FF" : "#666876",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
