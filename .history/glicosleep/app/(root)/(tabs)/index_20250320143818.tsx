import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "user@example.com" && password === "password") {
      Alert.alert("Login bem-sucedido!");
      router.replace("/home"); // Redireciona para a Home após login
    } else {
      Alert.alert("Erro", "Credenciais inválidas.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Bem Vindo à GlicoSleep</Text>
      
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          width: "100%",
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          width: "100%",
          marginBottom: 15,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#007BFF",
          paddingVertical: 12,
          borderRadius: 8,
          width: "100%",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ color: "#007BFF" }}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
