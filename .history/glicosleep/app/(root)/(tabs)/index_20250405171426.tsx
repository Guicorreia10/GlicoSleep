import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "../../../constants/images";
import icons from "@/constants/icons";

export default function Index() {
  return (
    <SafeAreaView className="bg-[#AEE4FF] h-full">
      {/* Header */}
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="w-12 h-12 rounded-full" />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-white">Bom Dia</Text>
              <Text className="text-base font-rubik-medium text-white">Gui</Text>
            </View>
          </View>
          <Image source={icons.bell} className="w-6 h-6" />
        </View>
      </View>

      {/* Main Content */}
      <View className="px-5 mt-10">
        {/* Sleep Info */}
        <Text className="text-lg font-rubik-medium text-white mb-3">Sono:</Text>
        <View className="flex flex-row items-center justify-between">
          {/* Pie Chart */}
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'white' }}>
            {/* Substitua este placeholder pelo componente de gráfico real */}
          </View>
          {/* Sleep Details */}
          <View className="ml-5">
            <Text className="text-sm font-rubik text-white">Sono leve: x horas</Text>
            <Text className="text-sm font-rubik text-white">Sono Profundo: x horas</Text>
          </View>
        </View>

        {/* Glycemia Chart */}
        <Text className="text-lg font-rubik-medium text-white mt-10 mb-3">
          Variação da Glicemia ao longo da noite:
        </Text>
        <View style={{ backgroundColor: 'white', height: 150, borderRadius: 8 }}>
          {/* Substitua este placeholder pelo componente de gráfico real */}
        </View>

        {/* Alerts and Recommendations */}
        <Text className="text-lg font-rubik-medium text-white mt-10 mb-3">
          Alertas e Recomendações:
        </Text>
        <Text className="text-sm font-rubik text-white">
          Um resumo geral da noite e de tudo o que pode melhorar, caso esteja algo mal com os valores, botão para aceder à página de ajuda.
        </Text>
      </View>

      {/* Footer */}
      <View className="absolute bottom-0 w-full bg-[#00BFFF] py-4 flex flex-row justify-around items-center">
        {/* Home Button */}
        <View className="flex flex-col items-center">
          <Image source={icons.home} className="w-6 h-6" />
          <Text className="text-xs font-rubik text-white">Menu Inicial</Text>
        </View>

        {/* Records Button */}
        <View className="flex flex-col items-center">
          <Image source={icons.calendar} className="w-6 h-6" />
          <Text className="text-xs font-rubik text-white">Registos</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
