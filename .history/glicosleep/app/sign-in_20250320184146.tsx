import React, { useState } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "../constants/images";
import icons from "../constants/icons";
import { loginUser } from "../services/appwrite";

const SignIn = ({ setIsAuthenticated }: { setIsAuthenticated: (auth: boolean) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      if (user) {
        await AsyncStorage.setItem("userToken", user.$id);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setMessage("Erro ao fazer login. Verifique seus dados.");
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
        {message ? <Text className="text-center text-red-500 mt-2">{message}</Text> : null}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
