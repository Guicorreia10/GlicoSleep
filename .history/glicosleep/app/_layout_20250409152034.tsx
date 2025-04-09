import { Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

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

  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setTimeout(() => {
            router.replace("/sign-in"); // ✅ safe navigation
          }, 0);
        }

        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded, router]); // 🔥 Colocar 'router' nas dependências também

  if (!appIsReady) {
    return null; 
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
