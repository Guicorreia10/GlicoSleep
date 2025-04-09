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
 const [fontsLoaded] = useFonts({
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
 async function prepare() {
 await SplashScreen.preventAutoHideAsync();
 try {
 const { data } = await supabase.auth.getSession();
 setSession(data.session);
 } catch (e) {
 console.warn(e);
 } finally {
 setLoading(false);
 }
 }


 prepare();
 } , []);


 useEffect(() => {
 if (fontsLoaded && !loading) {
 SplashScreen.hideAsync();
 }
 }, [fontsLoaded, loading]);


 if (!fontsLoaded || loading) {
 return null;
 }


 if (!session) {
 return <SignIn />;
 }


 return <Stack screenOptions={{ headerShown: false }} />;
}
