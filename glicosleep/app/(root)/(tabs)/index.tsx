import { Text, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "../../../constants/images";
import icons from "@/constants/icons";
import { PieChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Index() {
  const pieData = [
    { name: "Sono leve", population: 6, color: "#ADD8E6", legendFontColor: "#000", legendFontSize: 12 },
    { name: "Sono profundo", population: 2, color: "#00CED1", legendFontColor: "#000", legendFontSize: 12 },
  ];

  const barData = {
    labels: ["00h", "02h", "04h", "06h"],
    datasets: [
      {
        data: [20, 45, 28, 80],
      },
    ],
  };

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
        <Text style={styles.sectionTitle}>Sono:</Text>
        <View style={styles.sleepInfoContainer}>
          <PieChart
            data={pieData}
            width={150}
            height={150}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"0"}
            center={[75, 0]}
            style={styles.pieChart}
          />
          <View style={styles.sleepDetails}>
            <Text style={styles.sleepText}>Sono leve: x horas</Text>
            <Text style={styles.sleepText}>Sono Profundo: x horas</Text>
          </View>
        </View>

        {/* Glycemia Chart */}
        <Text style={styles.sectionTitle}>Variação da Glicemia ao longo da noite:</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          style={styles.barChart}
          yAxisLabel=""
          yAxisSuffix="mg/dL"
        />

        {/* Alerts and Recommendations */}
        <Text style={styles.sectionTitle}>Alertas e Recomendações:</Text>
        <Text style={styles.recommendationsText}>
          Um resumo geral da noite e de tudo o que pode melhorar, caso esteja algo mal com os valores, botão para aceder à página de ajuda.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Image source={icons.home} style={styles.footerIcon} />
          <Text style={styles.footerText}>Menu Inicial</Text>
        </View>
        <View style={styles.footerButton}>
          <Image source={icons.calendar} style={styles.footerIcon} />
          <Text style={styles.footerText}>Registos</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#AEE4FF",
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
    color: "white",
  },
  name: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    color: "white",
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  mainContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "white",
    marginBottom: 10,
  },
  sleepInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  pieChart: {
    marginVertical: 8,
  },
  sleepDetails: {
    marginLeft: 15,
  },
  sleepText: {
    fontSize: 14,
    fontFamily: "Rubik",
    color: "white",
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  recommendationsText: {
    fontSize: 14,
    fontFamily: "Rubik",
    color: "white",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#00BFFF",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerButton: {
    flexDirection: "column",
    alignItems: "center",
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: "white",
  },
});
