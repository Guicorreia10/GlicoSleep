import { Text, View } from "react-native";
import { Link } from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "../../../constants/images";




export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full"/>
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text>Bom Dia</Text>
              <Text>Gui</Text>
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
