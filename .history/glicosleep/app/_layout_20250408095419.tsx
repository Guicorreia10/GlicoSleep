import { Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import SignIn from "./sign-in";
import { View, Text } from 'react-native';


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
 const [fontsLoaded, fontError] = useFonts({
 "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
 "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
 "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
 "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
 "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
 "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
 });


 const [session, setSession] = useState<Session | null>(null);
 const [loading, setLoading] = useState(true);


 const loadSession = useCallback(async () => {
 console.log("loadSession: Obtendo sessão...");
 try {
 const { data, error } = await supabase.auth.getSession();
 if (error) {
 console.log("loadSession: Erro ao obter sessão:", error);
 } else {
 console.log("loadSession: Sessão obtida:", data);
 }
 setSession(data?.session || null);
 } catch (error) {
 console.log("loadSession: Erro inesperado:", error);
 } finally {
 setLoading(false);
 console.log("loadSession: Carregamento finalizado.");
 }
 }, []);


 useEffect(() => {
 console.log("useEffect: Iniciando...");
 loadSession();
 console.log("useEffect: Finalizado.");
 }, [loadSession]);


 useEffect(() => {
 console.log("useEffect [fontsLoaded]: Iniciando...");
 if (fontsLoaded) {
 SplashScreen.hideAsync();
 console.log("useEffect [fontsLoaded]: SplashScreen ocultado.");
 }
 console.log("useEffect [fontsLoaded]: Finalizado.");
 }, [fontsLoaded]);


 if (!fontsLoaded) {
 console.log("Render: Fontes não carregadas, retornando null.");
 return null; // ou um loading indicator
 }


 if (loading) {
 console.log("Render: Carregando, retornando indicador de carregamento.");
 return (
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 <Text>Loading...</Text>
 </View>
 );
 }


 if (!session) {
 console.log("Render: Sem sessão, retornando SignIn.");
 return <SignIn />;
 }


 console.log("Render: Sessão encontrada, retornando Stack.");
 return <Stack screenOptions={{ headerShown: false }} />;
}
