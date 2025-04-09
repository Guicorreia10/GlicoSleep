import { Stack, useRouter } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";
import { supabase } from "../lib/supabase";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para carregar a autenticação

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar sessão de autenticação usando Supabase
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setIsAuthenticated(true); // Usuário autenticado
      } else {
        router.replace("/sign-in"); // Redirecionar para tela de login
      }

      setIsLoading(false); // Finaliza o carregamento
    };

    checkAuth();
  }, [router]);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return <Stack />;
}
