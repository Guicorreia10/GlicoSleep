import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'; // Ajusta o caminho conforme o teu projeto
import icons from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? '#0061ff' : '#666876'}
      resizeMode="contain"
      className="size-6"
    />
    <Text className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/sign-in'); // Se não estiver logado, manda para o login
      } else {
        setLoading(false); // Se estiver logado, mostra as tabs
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0061ff" />
      </View>
    );
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Histórico',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.calendar} focused={focused} title="Histórico" />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
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
