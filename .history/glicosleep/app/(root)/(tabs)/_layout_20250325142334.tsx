import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack, router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/sign-in"); // Redireciona para login se não estiver autenticado
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0061ff" />
      </View>
    );
  }

  return <Stack />;
}
