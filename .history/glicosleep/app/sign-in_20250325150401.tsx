import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace("../(root)/(tabs)/index"); // Redireciona para as abas
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao fazer login.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#f0f0f0",
          padding: 10,
          borderRadius: 5,
          marginBottom: 15,
        }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#f0f0f0",
          padding: 10,
          borderRadius: 5,
          marginBottom: 15,
        }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#4A90E2",
          padding: 15,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff", fontSize: 16 }}>Entrar</Text>
      </TouchableOpacity>
      
      {/* Botão para registro */}
      <TouchableOpacity
        onPress={() => router.push("/registo")} // Redireciona para a página de registro
        style={{
          padding: 15,
          borderRadius: 5,
          backgroundColor: "#E3F2FD",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", color: "#0061FF", fontSize: 16 }}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn