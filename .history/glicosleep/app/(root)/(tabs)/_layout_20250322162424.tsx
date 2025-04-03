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
                tabBarShowLabel: true, // Mostra o título abaixo do ícone
                tabBarLabelStyle: {
                    fontSize: 12,
                    color: '#4A4A4A', // Cor do texto (neutra)
                    fontWeight: '500', // Peso do texto
                    marginTop: -5, // Ajusta o espaçamento entre ícone e texto
                },
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    backgroundColor: '#F6F9FC', // Fundo claro e moderno
                    borderRadius: 25,
                    borderTopWidth: 0, // Remove borda superior padrão
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.2, // Sombra mais suave
                    shadowRadius: 10,
                    elevation: 8, // Sombra no Android
                    height: 70, // Altura ajustada
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