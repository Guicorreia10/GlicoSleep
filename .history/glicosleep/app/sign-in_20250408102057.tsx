import React, { useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Verificar se o login foi bem-sucedido e redirecionar
      if (data?.session) {
        router.replace("/"); // Redirecionar para a navegação principal
      } else {
        Alert.alert("Erro", "Não foi possível obter a sessão.");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao fazer login.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      {/* Onboarding Image */}
      <Image
        source={require("../assets/images/onboarding.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 400,
          marginBottom: 30,
        }}
      />

      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
        Bem-vindo de Volta
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: "#f0f0f0",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#f0f0f0",
          padding: 15,
          borderRadius: 10,
          marginBottom: 25,
          fontSize: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#4A90E2",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/registo")}
        style={{
          padding: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#4A90E2",
          backgroundColor: "transparent",
        }}
      >
        <Text style={{ textAlign: "center", color: "#4A90E2", fontSize: 16, fontWeight: "600" }}>
          Criar Nova Conta
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
