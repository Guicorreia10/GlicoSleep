import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';

const TabsLayout = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false); // Estado de autenticação
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
        const checkAuthentication = async () => {
            // Aqui você pode checar se o usuário está autenticado (lógica real deve substituir essa simulação)
            const userToken = await new Promise((resolve) => setTimeout(() => resolve(true), 1000)); // Simulação: login com sucesso

            if (!userToken) {
                router.replace('/sign-in'); // Redireciona para a tela de login se não autenticado
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
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!authenticated) {
        return null; // Não renderiza nada até que o usuário esteja autenticado
    }

    // Renderiza as abas se autenticado
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
            {/* Aba Home */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            {/* Aba Histórico */}
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Histórico',
                }}
            />
            {/* Aba Perfil */}
            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'Perfil',
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
