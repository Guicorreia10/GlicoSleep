import { Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  const [session, setSession] = useState<Session | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (!fontsLoaded) return;

      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      // Ouve mudanças de sessão (login/logout)
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      setAppIsReady(true);
      await SplashScreen.hideAsync();
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  // Se não tem sessão → mostra Stack de Login
  if (!session) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
      </Stack>
    );
  }

  // Se tem sessão → mostra Stack normal (com tabs)
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(root)/(tabs)" />
    </Stack>
  );
}
