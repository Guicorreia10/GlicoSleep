import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
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
      router.replace("../(root)/(tabs)/index"); // Redireciona para o layout principal
    } catch (error: any) {
      Alert.alert("Erro ao fazer login", error.message || "Erro ao autenticar. Tente novamente.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#FAFAFA" }}>
      {/* Exibe a imagem de Onboarding */}
      <Image
        source={require("../assets/onboarding.png")} // Certifique-se de que o arquivo onboarding.png exista nesse caminho
        style={{ width: 200, height: 200, marginBottom: 20 }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 26, fontWeight: "600", marginBottom: 30, color: "#333" }}>Bem-vindo de volta</Text>
      
      {/* Input de Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          width: "100%",
          backgroundColor: "#FFF",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#DDD",
        }}
      />
      
      {/* Input de Senha */}
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: "100%",
          backgroundColor: "#FFF",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#DDD",
        }}
      />
      
      {/* Botão de Login */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: "100%",
          backgroundColor: "#4A90E2",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 16 }}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão para Registro */}
      <TouchableOpacity
        onPress={() => router.push("/registo")} // Redireciona para a página de registo
        style={{
          marginTop: 20,
          width: "100%",
          backgroundColor: "#E3F2FD",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#4A90E2", fontWeight: "600", fontSize: 16 }}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
