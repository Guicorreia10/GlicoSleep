import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../services/appwrite";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      const user = await createUser(email, password, name);
      console.log("Usuário registrado:", user);
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full p-10">
      <Text className="text-3xl font-bold text-center mb-5">Criar Conta</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-md p-3 mb-4"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="border border-gray-300 rounded-md p-3 mb-4"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded-md p-3 mb-4"
      />
      <TouchableOpacity 
        onPress={handleRegister} 
        className="bg-blue-500 rounded-full py-4 mt-5 items-center"
      >
        <Text className="text-lg font-rubik-medium text-white">Registrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;