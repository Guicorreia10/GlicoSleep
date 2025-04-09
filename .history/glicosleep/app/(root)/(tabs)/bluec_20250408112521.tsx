import React, { useState, useEffect } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
 import { BluetoothLE } from 'react-native-ble-plx';
 import { supabase } from '../../../lib/supabase'; // Import your Supabase client
 

 interface WearableDevice {
  id: string;
  name: string;
 }
 

 const Bluec = () => {
  const navigation = useNavigation();
  const [devices, setDevices] = useState<WearableDevice[]>([]);
  const bluetooth = new BluetoothLE();
 

  useEffect(() => {
  scanForDevices();
  }, []);
 

  const scanForDevices = () => {
  bluetooth.startDeviceScan(null, null, (error, device) => {
  if (error) {
  console.log(error);
  return;
  }
 

  if (device && device.name) {
  setDevices((prevDevices) => {
  const deviceExists = prevDevices.find((d) => d.id === device.id);
  if (!deviceExists) {
  return [...prevDevices, { id: device.id, name: device.name }];
  }
  return prevDevices;
  });
  }
  });
 

  setTimeout(() => {
  bluetooth.stopDeviceScan();
  }, 5000);
  };
 

  const connectToDevice = async (deviceId: string) => {
  try {
  const device = await bluetooth.connectToDevice(deviceId);
  await device.discoverAllServicesAndCharacteristics();
  // Here, discover the services and characteristics you need
  // and read the glucose data
  console.log(`Connected to device: ${device.name}`);
  // Save to Supabase
  saveDataToSupabase({ deviceId: device.id, deviceName: device.name, glucoseLevel: 100, timestamp: new Date() });
  } catch (error) {
  console.log('Connection error:', error);
  }
  };
 

  const saveDataToSupabase = async (data: any) => {
  try {
  const { error } = await supabase
  .from('wearable_data')
  .insert([data]);
 

  if (error) {
  console.error('Error saving data to Supabase:', error.message);
  } else {
  console.log('Data saved to Supabase successfully!');
  }
  } catch (error) {
  console.error('Error saving data to Supabase:', error);
  }
  };
 

  const renderItem = ({ item }: { item: WearableDevice }) => (
  <TouchableOpacity style={styles.deviceItem} onPress={() => connectToDevice(item.id)}>
  <Text>{item.name}</Text>
  </TouchableOpacity>
  );
 

  return (
  <View style={styles.container}>
  <Text style={styles.header}>Conectar Wearables e Dispositivos de Glicemia</Text>
  <TouchableOpacity style={styles.scanButton} onPress={scanForDevices}>
  <Text style={styles.scanButtonText}>Escanear Dispositivos</Text>
  </TouchableOpacity>
  <FlatList
  data={devices}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  />
  </View>
  );
 };
 

 const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#f0f0f0',
  },
  header: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
  },
  scanButton: {
  backgroundColor: '#4682B4',
  padding: 15,
  borderRadius: 5,
  marginBottom: 20,
  alignItems: 'center',
  },
  scanButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  },
  deviceItem: {
  backgroundColor: 'white',
  padding: 15,
  borderRadius: 5,
  marginBottom: 10,
  },
 });
 

 export default Bluec;