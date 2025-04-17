import { View, Text, ScrollView, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // <- Importa o ImagePicker
import icons from "@/constants/icons";
import images from "../../../constants/images";
import { settings } from '@/constants/data';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
    <View className="flex flex-row items-center gap-3">
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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Escolher imagem da galeria
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar suas fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      uploadImage(uri);
    }
  };

  // Upload da imagem para Supabase
  const uploadImage = async (uri: string) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        alert('Usuário não autenticado');
        return;
      }

      const fileExt = uri.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const response = await fetch(uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
          upsert: true, // sobrescreve se já existir
          contentType: blob.type,
        });

      if (uploadError) {
        console.error(uploadError);
        alert('Erro ao fazer upload da imagem.');
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;
      setAvatarUrl(publicUrl);

      // Atualiza o perfil do usuário
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        console.error(updateError);
        alert('Erro ao atualizar o perfil.');
      } else {
        Alert.alert('Sucesso', 'Imagem de perfil atualizada!');
      }
    } catch (error: any) {
      console.error(error);
      alert('Erro ao enviar imagem: ' + error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/sign-in');
      alert('Sessão terminada com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
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
            <Image
              source={avatarUrl ? { uri: avatarUrl } : images.avatar}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2" onPress={pickImage}>
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
          <SettingsItem
            icon={icons.logout}
            title="Terminar Sessão"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
