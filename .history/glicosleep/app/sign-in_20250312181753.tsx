import {View, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Image } from 'react-native';

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName='h-full'>
      <Image source={require('../assets/images/adaptive-icon.png')} className="w-full h-4/6" resizeMode="contain" />
      </ScrollView>


    </SafeAreaView>
  )
}
export default SignIn