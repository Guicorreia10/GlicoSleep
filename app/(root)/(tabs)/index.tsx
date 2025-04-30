import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { supabase } from "../../../lib/supabase";
import images from "../../../constants/images";
import icons from "@/constants/icons";

const screenWidth = Dimensions.get("window").width;

export default function Index() {
  const [sleepEvaluation, setSleepEvaluation] = useState<number | null>(null);
  const [sleepMessage, setSleepMessage] = useState<string>("Carregando...");
  const [glucoseValue, setGlucoseValue] = useState<number | null>(null);
  const [glucoseMessage, setGlucoseMessage] = useState<string>("Carregando...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("dados_usuario")
          .select("sono, qualidade_sono, dificuldade_ao_dormir, uso_dispositivos, glicose")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Erro ao buscar dados:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados.");
          return;
        }

        if (data && data.length > 0) {
          const { sono, qualidade_sono, dificuldade_ao_dormir, uso_dispositivos, glicose } = data[0];
          setGlucoseValue(glicose);

          const hoursScore = Math.min(sono / 8 * 10, 10) * 0.4;
          const qualityScore = qualidade_sono * 0.3;
          const difficultyScore = dificuldade_ao_dormir === "Sim" ? 0 : 10 * 0.2;
          const deviceScore = uso_dispositivos === "Sim" ? 0 : 10 * 0.1;
          const finalScore = hoursScore + qualityScore + difficultyScore + deviceScore;
          setSleepEvaluation(Number(finalScore.toFixed(1)));

          if (finalScore <= 5) {
            setSleepMessage("Tente dormir melhor hoje!");
          } else {
            setSleepMessage("O seu sono está ótimo!");
          }

          if (glicose <= 70) {
            setGlucoseMessage("Atenção: glicose baixa.");
          } else if (glicose <= 140) {
            setGlucoseMessage("Glicose dentro do normal!");
          } else {
            setGlucoseMessage("Tenha cuidado: glicose elevada.");
          }
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
        Alert.alert("Erro", "Erro ao carregar dados.");
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={images.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Olá, Gui 👋</Text>
              <Text style={styles.subGreeting}>Pronto para hoje?</Text>
            </View>
          </View>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>

        {/* Resumo do Dia */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo do Sono</Text>
          <Text style={styles.cardValue}>
            {sleepEvaluation ? `${sleepEvaluation} / 10` : "A carregar..."}
          </Text>
          <Text style={styles.cardText}>{sleepMessage}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Glicose Atual</Text>
          <Text style={styles.cardValue}>
            {glucoseValue ? `${glucoseValue} mg/dL` : "A carregar..."}
          </Text>
          <Text style={styles.cardText}>{glucoseMessage}</Text>
        </View>

        {/* Ações Recomendadas */}
        <Text style={styles.sectionTitle}>Ações para Hoje</Text>
        <View style={styles.actionBox}>
          <Text style={styles.actionItem}>🌙 Tente dormir 30 minutos mais cedo.</Text>
          <Text style={styles.actionItem}>💧 Beba 2 litros de água.</Text>
          <Text style={styles.actionItem}>🚶‍♂️ Faça uma caminhada rápida.</Text>
          <Text style={styles.actionItem}>🍎 Dê preferência a frutas no pequeno almoço.</Text>
        </View>

        {/* Progresso */}
        <Text style={styles.sectionTitle}>Seu Progresso</Text>
        <View style={styles.progressBox}>
          <Text style={styles.progressItem}>🏆 5 dias seguidos a dormir 7h+</Text>
          <Text style={styles.progressItem}>💪 Glicose controlada 3 dias</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F0F8FF" },
  scrollContent: { padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  greeting: { fontSize: 18, fontFamily: "Rubik-Medium", color: "#08457E" },
  subGreeting: { fontSize: 14, color: "#888" },
  bellIcon: { width: 24, height: 24 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 16, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 5 },
  cardTitle: { fontSize: 18, fontFamily: "Rubik-Bold", color: "#08457E", marginBottom: 5 },
  cardValue: { fontSize: 36, fontFamily: "Rubik-Bold", color: "#007AFF" },
  cardText: { fontSize: 14, color: "#666", marginTop: 5 },
  sectionTitle: { fontSize: 20, fontFamily: "Rubik-Bold", color: "#08457E", marginBottom: 10, marginTop: 20 },
  actionBox: { backgroundColor: "#E0F7FA", padding: 15, borderRadius: 12 },
  actionItem: { fontSize: 14, color: "#00796B", marginBottom: 8 },
  progressBox: { backgroundColor: "#FFF3E0", padding: 15, borderRadius: 12, marginTop: 10 },
  progressItem: { fontSize: 14, color: "#E65100", marginBottom: 8 },
});
