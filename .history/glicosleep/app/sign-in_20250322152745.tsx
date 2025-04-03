import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router"; // Substitui useNavigation
import { supabase } from "../lib/supabase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Hook do Expo Router

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      // Redirecione para a tela principal
      router.push("../(root)/(tabs)/index"); // Substitua "/home" pela sua rota principal
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
        style={{ backgroundColor: "#f0f0f0", padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ backgroundColor: "#f0f0f0", padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "#4A90E2", padding: 15, borderRadius: 5 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/registo")} style={{ marginTop: 15 }}>
        <Text style={{ textAlign: "center", color: "#4A90E2" }}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
