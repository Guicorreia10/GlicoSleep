import { View, Text, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons";
import images from "../../../constants/images";
import { Image } from 'react-native';
import { settings } from '@/constants/data';
import { supabase } from '@/lib/supabase'; // Adicione isso para importar o Supabase
import { useRouter } from 'expo-router'; // Para navegação

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
    <View className="flex flex-row itms-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>
    {showArrow && (
      <Image source={icons.rightArrow} className="size-5" />
    )}
  </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();

  // Função para lidar com o logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // Desloga o usuário
      router.replace('/sign-in'); // Redireciona para a tela de login após o logout
      alert('Sessão terminada com sucesso!'); // Mensagem de sucesso
    } catch (error: unknown) {  // Agora 'error' é do tipo 'unknown'
      if (error instanceof Error) {  // Verifica se o erro é uma instância de 'Error'
        alert('Erro ao tentar terminar a sessão: ' + error.message);
      } else {
        alert('Erro desconhecido');
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Perfil</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image source={images.avatar} className="size-44 relative rounded-full" />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">Gui</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="O Meu Histórico" onPress={() => {}} />
          <SettingsItem icon={icons.wallet} title="Carteira" onPress={() => {}} />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {/* Adicionando o botão de logout */}
          <SettingsItem
            icon={icons.logout}
            title="Terminar Sessão"
            showArrow={false}
            onPress={handleLogout} // Aciona a função de logout
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
