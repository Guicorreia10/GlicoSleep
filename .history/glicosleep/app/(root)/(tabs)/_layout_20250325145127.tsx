import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import icons from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image source={icon} tintColor={focused ? '#0061ff' : '#666876'} resizeMode="contain" className="size-6" />
        <Text
            className={`${
                focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'
            } text-xs w-full text-center mt-1`}
        >
            {title}
        </Text>
    </View>
);

const TabsLayout = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false); // Estado para autenticação
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
        const checkAuthentication = async () => {
            // Simulação de autenticação; substitua com sua lógica real
            const isLoggedIn = await new Promise((resolve) => setTimeout(() => resolve(false), 1000)); // Exemplo: Não autenticado

            setLoading(false); // Termina carregamento

            if (!isLoggedIn) {
                router.replace("/sign-in"); // Redireciona para a página de login
            } else {
                setAuthenticated(true); // Usuário autenticado
            }
        };

        checkAuthentication();
    }, [router]);

    if (loading) {
        // Mostra indicador de carregamento enquanto verifica autenticação
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!authenticated) {
        return null; // Evita renderizar nada enquanto redireciona para login
    }

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 15,
                    right: 15,
                    backgroundColor: '#E3F2FD', // Azul muito mais claro
                    borderRadius: 25, // Bordas arredondadas suaves
                    borderTopWidth: 0, // Remove borda superior
                    shadowColor: '#000', // Sombra leve
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.15, // Sombra mais suave
                    shadowRadius: 10,
                    elevation: 5, // Sombra para Android
                    height: 75, // Altura ajustada
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

export default TabsLayout;
