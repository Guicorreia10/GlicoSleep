import { Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import SignIn from "./sign-in";


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


 useEffect(() => {
 async function loadSession() {
 try {
 const { data, error } = await supabase.auth.getSession();
 if (error) {
 console.log("Error getting session:", error);
 }
 setSession(data?.session || null);
 } catch (error) {
 console.log("Unexpected error getting session:", error);
 } finally {
 setLoading(false);
 }
 }


 loadSession();
 }, []);


 useEffect(() => {
 if (fontsLoaded) {
 SplashScreen.hideAsync();
 }
 }, [fontsLoaded]);


 if (!fontsLoaded) {
 return null; // ou um loading indicator
 }


 if (loading) {
 return (
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 <Text>Loading...</Text>
 </View>
 );
 }


 if (!session) {
 return <SignIn />;
 }


 return <Stack screenOptions={{ headerShown: false }} />;
}


import { View, Text } from 'react-native';
