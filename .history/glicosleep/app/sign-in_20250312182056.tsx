import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Senha:', password);
    // Adicione a lógica de autenticação aqui
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1 justify-center px-6">
      <View>
        <Text className="text-2xl font-bold text-center mb-6">Bem-vindo!</Text>

        <Text className="mb-2 text-gray-700">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="Digite seu email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="mb-2 text-gray-700">Senha</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-6"
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4">
          <Text className="text-blue-500 text-center">Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
