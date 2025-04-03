import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"; // Adicionado ScrollView
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images"; // Alterado para caminho relativo correto
import icons from "../constants/icons"; // Alterado para caminho relativo correto

const SignIn = () => {
  const handleLogin = () => {
    
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
        <Image 
          source={images.onboarding} 
          style={{ width: "100%", height: "66%" }} // `className` não funciona diretamente no RN
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="font-bold text-3xl text-center">Bem Vindo à GlicoSleep</Text>
          <Text className="text-center text-gray-500 mt-4">Faça login para continuar</Text>
        </View>
        <TouchableOpacity onPress={handleLogin} className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5">
          <View className="flex flex-row items-center justify-center">
          <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
          <Text className="text-lg font-rubik-medium text-black-300 ml-2">Continue com o Google</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
