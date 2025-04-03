import React, { useState } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import icons from "../constants/icons";
import { loginUser } from "../services/appwrite";

const SignIn = ({ setScreen }: { setScreen: (screen: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      console.log("Usuário logado:", user);
      setMessage("✅ Login bem-sucedido!");
      setTimeout(() => setScreen("home"), 1500); // Redireciona após 1,5s
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage("❌ Erro: Verifique seu email ou senha.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
        <Image 
          source={images.onboarding} 
          style={{ width: "100%", height: 250, marginBottom: 20 }}
          resizeMode="contain"
        />
        <Text className="font-bold text-3xl text-center">Bem-vindo à GlicoSleep</Text>
        <Text className="text-center text-gray-500 mt-2">Faça login para continuar</Text>

        {message ? <Text className="text-center text-red-500 mt-3">{message}</Text> : null}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="border border-gray-300 rounded-md p-3 mt-5"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-md p-3 mt-4"
        />

        <TouchableOpacity 
          onPress={handleLogin} 
          className="bg-blue-500 rounded-full w-full py-4 mt-5 flex flex-row items-center justify-center"
        >
          <Text className="text-lg font-rubik-medium text-white">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setScreen("register")}
          className="bg-gray-500 rounded-full w-full py-4 mt-5 flex flex-row items-center justify-center"
        >
          <Text className="text-lg font-rubik-medium text-white">Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
