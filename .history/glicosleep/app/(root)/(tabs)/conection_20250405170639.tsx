// conection.tsx
// app/(root)/(tabs)/conection.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

const ConnectionScreen = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<any | null>(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }
  };

  const scanForDevices = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Erro ao escanear:', error);
        return;
      }
      if (device && !devices.find(d => d.id === device.id)) {
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });

    // Parar scan após 5 segundos
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 5000);
  };

  const connectToDevice = async (device: any) => {
    try {
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      console.log('Conectado a', connected.name);
    } catch (error) {
      console.error('Erro ao conectar:', error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos Bluetooth</Text>
      <Button title="Procurar Dispositivos" onPress={scanForDevices} />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceItem}
            onPress={() => connectToDevice(item)}
          >
            <Text>{item.name || 'Sem nome'}</Text>
            <Text style={styles.deviceId}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />

      {connectedDevice && (
        <View style={styles.connectedInfo}>
          <Text style={styles.connectedText}>
            Ligado a: {connectedDevice.name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ConnectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  deviceItem: {
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    marginBottom: 10,
  },
  deviceId: { fontSize: 12, color: '#555' },
  connectedInfo: { marginTop: 20 },
  connectedText: { fontSize: 18, fontWeight: 'bold', color: 'green' },
});
