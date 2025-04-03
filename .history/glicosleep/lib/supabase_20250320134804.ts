import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qelivboxuxrxkenvfzox.supabase.coYOUR_SUPABASE_URL'; // Substitua pelo URL do seu projeto
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Substitua pela sua anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
