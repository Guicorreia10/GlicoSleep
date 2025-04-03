import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router"; // Substitui useNavigation
import { supabase } from "../lib/supabase";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Hook do Expo Router

  const handleRegister = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert("Sucesso", "Conta criada com sucesso! Verifique seu e-mail.");
      router.push("/sign-in"); // Redireciona para a página de login
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao criar conta.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Registro</Text>
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
      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: "#4A90E2", padding: 15, borderRadius: 5 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registro;
