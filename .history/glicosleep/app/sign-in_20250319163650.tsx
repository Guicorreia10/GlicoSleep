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
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
