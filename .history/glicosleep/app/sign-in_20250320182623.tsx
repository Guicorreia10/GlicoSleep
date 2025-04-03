import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import icons from "../constants/icons";
import { loginUser } from "../services/appwrite";

const SignIn = () => {
  const handleLogin = async () => {
    try {
      const user = await loginUser("email@example.com", "password123"); // Substitua pelos dados reais do usuário
      console.log("Usuário logado:", user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image 
          source={images.onboarding} 
          style={{ width: "100%", height: "66%" }}
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="font-bold text-3xl text-center">Bem Vindo à GlicoSleep</Text>
          <Text className="text-center text-gray-500 mt-4">Faça login para continuar</Text>
        </View>
        <TouchableOpacity 
          onPress={handleLogin} 
          className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
        >
          <View className="flex flex-row items-center justify-center">
            <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
            <Text className="text-lg font-rubik-medium text-black-300 ml-2">Continue com o Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleLogin} 
          className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex flex-row items-center justify-center"
        >
          <Text className="text-lg font-rubik-medium text-black-300">Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => console.log("Registro pressionado")}
          className="bg-blue-500 rounded-full w-full py-4 mt-5 flex flex-row items-center justify-center"
        >
          <Text className="text-lg font-rubik-medium text-white">Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
