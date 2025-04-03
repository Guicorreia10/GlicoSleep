import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const [authenticated, setAuthenticated] = useState(false); // Estado de autenticação
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      setAuthenticated(!!session.data.session); // Define se o usuário está autenticado
      setLoading(false); // Carregamento concluído
    };

    SplashScreen.preventAutoHideAsync(); // Evita esconder splash antes de terminar a verificação
    checkSession();
    SplashScreen.hideAsync(); // Esconde splash screen após autenticação
  }, []);

  if (loading) return null; // Mantém o splash screen enquanto verifica

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Desativa o cabeçalho padrão
      }}
    >
      {/* Verifica se o usuário está autenticado */}
      {!authenticated ? (
        <>
          <Stack.Screen name="sign-in" options={{ title: "Login" }} />
          <Stack.Screen name="registo" options={{ title: "Criar Conta" }} />
        </>
      ) : (
        <>
          <Stack.Screen name="(tabs)" options={{ title: "Tabs" }} />
          <Stack.Screen name="properties/[id]" options={{ title: "Property Details" }} />
        </>
      )}
    </Stack>
  );
}
