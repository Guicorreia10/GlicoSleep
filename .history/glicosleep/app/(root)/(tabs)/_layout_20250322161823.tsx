import{View, Text, Image} from 'react-native';
import React from 'react';
import{Tabs} from 'expo-router';
import icons from "@/constants/icons";

const TabIcon = ({focused, icon, title}: {focused: boolean; icon:any; title:string}) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image source={icon} tintColor={focused? '#0061ff' : '#666876'} resizeMode="contain" className="size-6"/>
        <Text className={`${focused ? 'text-primary-300 font-rubik-medium': 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
                {title}
            </Text>
    </View>

)



const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 20, // Eleva a barra acima do fundo
                    left: 10, // Deixa espaço para bordas laterais
                    right: 10, // Espaço igual à esquerda
                    borderRadius: 30, // Arredondamento da barra
                    borderTopWidth: 0, // Remove borda superior padrão
                    shadowColor: '#000', // Cor da sombra
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.1, // Opacidade da sombra
                    shadowRadius: 10, // Raio da sombra
                    elevation: 5, // Para sombra no Android
                    height: 70, // Altura da barra
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.home} focused={focused} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Histórico',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.calendar} focused={focused} title="Histórico" />
                    ),
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'Perfil',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.person} focused={focused} title="Perfil" />
                    ),
                }}
            />
        </Tabs>
    );
};
export default TabsLayout