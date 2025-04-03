import { Text, View, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "../../sign-in";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!userToken);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (!isAuthenticated) {
    return <SignIn setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10 font-rubik text-3xl">Bem-Vindo à GlicoSleep</Text>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Perfil</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
}
