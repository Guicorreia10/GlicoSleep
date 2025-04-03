import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createClient } from '@supabase/supabase-js';
import images from "../constants/images";
import icons from "../constants/icons";

const supabaseUrl = "https://qelivboxuxrxkenvfzox.supabase.c";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbGl2Ym94dXhyeGtlbnZmem94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Nzc5ODUsImV4cCI6MjA1ODA1Mzk4NX0.y27YWQshSDhUwg6bRHd5Z5a7lFh_9Os00fM7UiDXc7k";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    }
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert("Sucesso", "Conta criada com sucesso! Verifique seu email.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image 
          source={images.onboarding} 
          style={{ width: "100%", height: "50%" }}
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="font-bold text-3xl text-center">Bem Vindo à GlicoSleep</Text>
          <Text className="text-center text-gray-500 mt-4">Faça login para continuar</Text>
        </View>
        
        <View className="px-10 mt-5">
          <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            className="border border-gray-300 rounded-md p-3 w-full"
          />
          <TextInput 
            placeholder="Senha" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            className="border border-gray-300 rounded-md p-3 w-full mt-3"
          />
        </View>
        
        <TouchableOpacity 
          onPress={handleLogin} 
          className="bg-blue-500 rounded-full w-full py-4 mt-5 flex items-center justify-center"
        >
          <Text className="text-lg font-rubik-medium text-white">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleRegister} 
          className="bg-gray-200 rounded-full w-full py-4 mt-5 flex items-center justify-center"
        >
          <Text className="text-lg font-rubik-medium text-black">Criar Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;