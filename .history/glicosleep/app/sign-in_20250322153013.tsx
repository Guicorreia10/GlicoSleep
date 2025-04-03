import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router"; // Substitui useNavigation
import { supabase } from "../lib/supabase";
import images from "../constants/images"; // Certifique-se de que onboarding.png está configurado corretamente

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
      router.push("../(root)/(tabs)/index"); // Substitua pela sua rota principal
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao fazer login.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
      <Image
        source={images.onboarding} // Certifique-se de que este caminho esteja correto
        style={{
          width: "100%",
          height: "50%", // Ajuste a altura conforme necessário
          resizeMode: "contain",
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
          Bem-Vindo à GlicoSleep
        </Text>
        <Text style={{ textAlign: "center", color: "#707070", marginBottom: 20 }}>
          Faça login para continuar
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            backgroundColor: "#F7F7F7",
            padding: 10,
            borderRadius: 8,
            marginBottom: 15,
          }}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: "#F7F7F7",
            padding: 10,
            borderRadius: 8,
            marginBottom: 15,
          }}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#4A90E2",
            borderRadius: 8,
            paddingVertical: 15,
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/registo")}
          style={{
            paddingVertical: 15,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#4A90E2", textAlign: "center", fontSize: 16 }}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;
