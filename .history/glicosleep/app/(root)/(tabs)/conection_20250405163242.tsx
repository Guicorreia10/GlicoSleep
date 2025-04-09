import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList, TouchableOpacity } from "react-native";
import { BleManager } from "react-native-ble-plx";

const manager = new BleManager();

const BluetoothConnection = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<any>(null);
  const [receivedData, setReceivedData] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Erro a fazer scan:", error);
        return;
      }

      if (device && device.name && device.name.includes("Smartwatch")) {
        console.log("Encontrado:", device.name);
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });

    // Parar o scan após 10 segundos
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000);
  };

  const connectToDevice = async (device: any) => {
    try {
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      console.log("Ligado ao dispositivo:", connected.name);

      // Supondo que existe uma característica que envia glicose
      const services = await connected.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          if (characteristic.isNotifiable) {
            characteristic.monitor((error, char) => {
              if (error) {
                console.error("Erro a receber dados:", error);
                return;
              }
              if (char?.value) {
                const decodedData = atob(char.value); // Base64 -> string
                console.log("Dados recebidos:", decodedData);
                setReceivedData(decodedData);
              }
            });
          }
        }
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Button title="Procurar Smartwatch" onPress={scanAndConnect} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 border-b border-gray-300"
            onPress={() => connectToDevice(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {connectedDevice && (
        <View className="mt-4">
          <Text className="font-bold">Ligado a: {connectedDevice.name}</Text>
        </View>
      )}
      {receivedData && (
        <View className="mt-4">
          <Text className="text-green-600">Dados recebidos: {receivedData}</Text>
        </View>
      )}
    </View>
  );
};

export default BluetoothConnection;
