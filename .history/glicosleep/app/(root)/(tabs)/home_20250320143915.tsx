import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function Home() {
  const handleExplore = () => {
    Alert.alert("Explorar", "Você clicou no botão Explorar!");
  };

  const handleProfile = () => {
    Alert.alert("Perfil", "Você clicou no botão Perfil!");
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Bem-vindo à GlicoSleep</Text>

      {/* Mensagem de boas-vindas */}
      <Text style={styles.subtitle}>
        Aqui está sua tela inicial. Explore as funcionalidades do aplicativo!
      </Text>

      {/* Botões de navegação */}
      <TouchableOpacity style={styles.button} onPress={handleExplore}>
        <Text style={styles.buttonText}>Explorar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleProfile}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
