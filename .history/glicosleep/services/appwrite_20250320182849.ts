import { Client, Account, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Substitua pelo seu endpoint Appwrite
  .setProject('67dc5b14002a67d4b1a3'); // Substitua pelo seu Project ID

const account = new Account(client);

export const getUser = async () => {
  try {
    const user = await account.get();
    return { name: user.name, email: user.email };
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    return await account.createSession(email, password);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Erro ao sair:', error);
  }
};

// ✅ Função de registro corrigida
export const createUser = async (email: string, password: string, name: string) => {
  try {
    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};
