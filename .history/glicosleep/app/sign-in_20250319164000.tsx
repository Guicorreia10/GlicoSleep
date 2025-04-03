import React from "react";
import { View, Text, Image, ScrollView } from "react-native"; // Adicionado ScrollView
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images"; // Alterado para caminho relativo correto

const SignIn = () => {
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
