import {View, Text, ScrollView, TouchableOpacity, ImageSourcePropType} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons";
import images from "../../../constants/images"; // Alterado para caminho relativo correto


import { Image } from 'react-native';



interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow= true}: SettingsItemProps) => (
  <TouchableOpacity>
    <View>
      <Image source ={icon}/>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
)
const Profile = () => {
  const handleLogout = async () => {};



  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className ="text-xl font-rubik-bold">
            Perfil
          </Text>
          <Image source={icons.bell}className="size-5"/>
        </View>
        <View className ="flex-row justify-center flex mt-5">
            <View className="flex flex-col items-center relative mt-5">
        <Image source={images.avatar} className="size-44 relative rounded-full"></Image>
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9"></Image>
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">Gui</Text>

          </View>

        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon ={icons.calendar} title="O Meu Historico" onPress={() => {}}/>

        </View>



       </ScrollView> 
    </SafeAreaView>
  )
}
export default Profile