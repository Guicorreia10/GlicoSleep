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


 const loadInitialSession = async () => {
 try {
 const { data, error } = await supabase.auth.getSession();
 if (error) {
 console.log("Erro ao obter sessão inicial:", error);
 } else {
 console.log("Sessão inicial obtida:", data);
 }
 setSession(data?.session || null);
 } catch (error) {
 console.log("Erro inesperado ao obter sessão inicial:", error);
 } finally {
 setLoading(false);
 }
 };


 useEffect(() => {
 console.log("useEffect: Carregando sessão inicial...");
 loadInitialSession();
 }, []);


 if (loading) {
 console.log("Render: Carregando...");
 return (
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 <Text>Carregando sessão...</Text>
 </View>
 );
 }


 if (!session) {
 console.log("Render: Sem sessão, exibindo SignIn...");
 return <SignIn />;
 }


 if (!fontsLoaded) {
 console.log("Render: Fontes não carregadas, retornando null.");
 return null;
 }


 console.log("Render: Sessão encontrada, exibindo Stack...");
 return <Stack screenOptions={{ headerShown: false }} />;
}
