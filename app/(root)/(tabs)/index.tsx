import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { supabase } from "../../../lib/supabase";
import images from "../../../constants/images";
import icons from "@/constants/icons";

const screenWidth = Dimensions.get("window").width;

export default function Index() {
  const [sleepEvaluation, setSleepEvaluation] = useState<number | null>(null); // Avaliação do sono
  const [sleepMessage, setSleepMessage] = useState<string>("Carregando..."); // Mensagem personalizada
  const [sleepData, setSleepData] = useState<{
    sono: number;
    qualidade_sono: number;
    dificuldade_ao_dormir: string;
    uso_dispositivos: string;
  } | null>(null); // Dados de sono para gráficos

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const { data, error } = await supabase
          .from("dados_usuario")
          .select("sono, qualidade_sono, dificuldade_ao_dormir, uso_dispositivos")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Erro ao buscar dados de sono:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados do sono.");
          return;
        }

        if (data && data.length > 0) {
          const { sono, qualidade_sono, dificuldade_ao_dormir, uso_dispositivos } = data[0];
          setSleepData(data[0]);

          // Calcula a avaliação do sono
          const hoursScore = Math.min(sono / 8 * 10, 10) * 0.4; // 8 horas é ideal
          const qualityScore = qualidade_sono * 0.3;
          const difficultyScore = dificuldade_ao_dormir === "Sim" ? 0 : 10 * 0.2;
          const deviceScore = uso_dispositivos === "Sim" ? 0 : 10 * 0.1;
          const finalScore = hoursScore + qualityScore + difficultyScore + deviceScore;

          setSleepEvaluation(Number(finalScore.toFixed(1))); // Atualiza a avaliação

          // Define mensagem baseada na avaliação
          if (finalScore <= 3) {
            setSleepMessage("Seu sono foi muito ruim. Procure um médico para orientação.");
          } else if (finalScore > 3 && finalScore <= 5) {
            setSleepMessage("Sono insatisfatório. Reduza o uso de dispositivos antes de dormir e melhore seus hábitos.");
          } else if (finalScore > 5 && finalScore <= 8) {
            setSleepMessage("Sono razoável, mas pode melhorar com uma rotina mais consistente.");
          } else {
            setSleepMessage("Excelente! Seu sono está ótimo. Continue assim!");
          }
        } else {
          Alert.alert("Aviso", "Nenhum dado de sono encontrado.");
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
        Alert.alert("Erro", "Ocorreu um erro ao carregar os dados.");
      }
    };

    fetchSleepData();
  }, []);

  const pieData = [
    {
      name: "Sono leve",
      population: sleepData ? sleepData.sono - sleepData.qualidade_sono : 0,
      color: "#ADD8E6",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Sono profundo",
      population: sleepData ? sleepData.qualidade_sono : 0,
      color: "#00CED1",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#08457E",
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image source={images.avatar} style={styles.avatar} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Bom Dia</Text>
            <Text style={styles.name}>Gui</Text>
          </View>
        </View>
        <Image source={icons.bell} style={styles.bellIcon} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Sleep Info */}
        <Text style={styles.sectionTitle}>Avaliação do Seu Sono</Text>
        <View style={styles.sleepEvaluationContainer}>
          <Text style={styles.sleepEvaluationValue}>
            {sleepEvaluation ? `${sleepEvaluation} / 10` : "Carregando..."}
          </Text>
          <Text style={styles.sleepEvaluationExplanation}>
            Avaliação calculada com base na duração do sono, sua qualidade e outros hábitos.
          </Text>
          <Text style={styles.sleepMessage}>{sleepMessage}</Text>
        </View>

        {/* Gráficos de Sono */}
        <Text style={styles.sectionTitle}>Gráfico do Sono</Text>
        <View style={styles.sleepInfoContainer}>
          <PieChart
            data={pieData}
            width={screenWidth - 50}
            height={150}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            style={styles.pieChart}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EAF7FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    flexDirection: "column",
  },
  greeting: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: "#333",
  },
  name: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    color: "#333",
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  mainContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Medium",
    color: "#08457E",
    marginBottom: 15,
    textAlign: "center",
  },
  sleepEvaluationContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  sleepEvaluationValue: {
    fontSize: 40,
    fontFamily: "Rubik-Bold",
    color: "#007AFF",
    textAlign: "center",
  },
  sleepEvaluationExplanation: {
    fontSize: 14,
    fontFamily: "Rubik",
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  sleepMessage: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#FF4500",
    textAlign: "center",
    marginTop: 10,
  },
  sleepInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  pieChart: {
    marginVertical: 8,
  },
});

