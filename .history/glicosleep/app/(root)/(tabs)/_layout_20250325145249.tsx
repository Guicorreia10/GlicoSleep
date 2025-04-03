import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';

const TabsLayout = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false); // Estado de autenticação
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
        const checkAuthentication = async () => {
            // Aqui você pode checar se o usuário está autenticado (Substitua esta simulação com sua lógica real)
            const userToken = await new Promise((resolve) => setTimeout(() => resolve(false), 1000)); // Simulação

            if (!userToken) {
                router.replace('/sign-in'); // Redireciona para a tela de login
            } else {
                setAuthenticated(true); // Marca como autenticado
            }
            setLoading(false); // Finaliza o carregamento
        };

        checkAuthentication();
    }, [router]);

    if (loading) {
        // Exibe indicador de carregamento enquanto verifica autenticação
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0061FF" />
                <Text>Verificando autenticação...</Text>
            </View>
        );
    }

    if (!authenticated) {
        return null; // Evita renderizar as abas até que a autenticação seja verificada
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
                    backgroundColor: '#E3F2FD',
                    borderRadius: 25,
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                    elevation: 5,
                    height: 75,
                },
            }}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="explore" options={{ title: 'Histórico' }} />
            <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
        </Tabs>
    );
};

export default TabsLayout;
