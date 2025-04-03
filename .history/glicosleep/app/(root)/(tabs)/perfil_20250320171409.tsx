import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons";


import { Image } from 'react-native';
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
       </ScrollView> 
    </SafeAreaView>
  )
}
export default Profile