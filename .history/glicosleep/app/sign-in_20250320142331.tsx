import React, { useState } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images"; // Certifique-se de que o caminho está correto
import { supabase } from "../lib/supabase"; // Importa a configuração do Supabase

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      Alert.alert("Login bem-sucedido!");
      // Aqui você pode redirecionar para outra tela ou realizar ações adicionais
    } catch (error: unknown) {
      // Verifica se o erro é uma instância de Error
      if (error instanceof Error) {
        Alert.alert("Erro ao fazer login", error.message);
      } else {
        Alert.alert("Erro desconhecido", String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Imagem de introdução */}
        <Image 
          source={images.onboarding} 
          style={{ width: "100%", height: "66%" }} 
          resizeMode="contain"
        />

        {/* Título e subtítulo */}
        <View style={{ paddingHorizontal: 40 }}>
          <Text style={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}>Bem Vindo à GlicoSleep</Text>
          <Text style={{ textAlign: "center", color: "#6B7280", marginTop: 10 }}>Faça login para continuar</Text>
        </View>

        {/* Campo de E-mail */}
        <View style={{ paddingHorizontal: 40, marginTop: 20 }}>
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginBottom: 15,
            }}
          />
        </View>

        {/* Campo de Senha */}
        <View style={{ paddingHorizontal: 40 }}>
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginBottom: 15,
            }}
          />
        </View>

        {/* Botão de Login */}
        <TouchableOpacity 
          onPress={handleLogin} 
          disabled={loading} 
          style={{
            backgroundColor: "#007BFF",
            shadowColor: "#0061ff",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            borderRadius: 50,
            paddingVertical: 12,
            marginHorizontal: 40,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
            {loading ? "Entrando..." : "Log In"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
