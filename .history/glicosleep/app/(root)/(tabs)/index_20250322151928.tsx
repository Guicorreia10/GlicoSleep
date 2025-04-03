import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className = "font-bold text-lg my-10 font-rubik text-3xl">Bem Vindo à GlicoSleep</Text>
      <Link href = "/sign-in">Sign In</Link>
      <Link href = "/explore">Explore</Link>
      <Link href = "/perfil">Perfil</Link>
      <Link href = "/properties/1">Property</Link>
      <Link href = "/registro">Property</Link>
    </View>
  );
}
