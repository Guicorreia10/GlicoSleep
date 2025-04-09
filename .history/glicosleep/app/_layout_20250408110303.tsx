import { Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen"; // Importação corrigida





export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"), // Corrigi o nome do ficheiro
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf") // Corrigi o nome do ficheiro
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]); 

  if (!fontsLoaded) return null; 

  return (
    <Stack>
      <Stack.Screen
      name="sign-in"
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen
      name="registo"
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen
      name="(root)/(tabs)/index"
      options={{
        headerShown: false,
      }}
      />
    </Stack>
  )
  
}