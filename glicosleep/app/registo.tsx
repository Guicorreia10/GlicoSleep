import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import iconImage from "../assets/images/icon.png"; 
const Registro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome_completo: nome,
          },
        },
      });

      if (error) throw error;

      Alert.alert("Sucesso", "Conta criada com sucesso! Verifique seu e-mail.");
      router.push("/sign-in");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao criar conta.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
      <Image
        source={iconImage} // Usa a imagem local
        style={{
          width: "100%",
          height: 300, // Define uma altura maior
          resizeMode: "cover", // Faz a imagem preencher todo o espaço
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
          Criar Conta
        </Text>
        <TextInput
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
          style={{
            backgroundColor: "#F7F7F7",
            padding: 10,
            borderRadius: 8,
            marginBottom: 15,
          }}
        />
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
          onPress={handleRegister}
          style={{
            backgroundColor: "#4A90E2",
            borderRadius: 8,
            paddingVertical: 15,
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/sign-in")}
          style={{
            paddingVertical: 15,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#4A90E2", textAlign: "center", fontSize: 16 }}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Registro;
