import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

const BluetoothConnect = () => {
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === "PoweredOn") {
        console.log("Bluetooth ligado e pronto para escanear.");
      }
    }, true);

    return () => subscription.remove(); // Remove a assinatura quando o componente desmonta
  }, [manager]);

  const startScan = () => {
    setDevices([]); // Limpa dispositivos antes de escanear
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        Alert.alert("Erro", error.message || "Ocorreu um problema durante o escaneamento.");
        return;
      }
      if (device && !devices.find((d) => d.id === device.id)) {
        setDevices((prevDevices) => [...prevDevices, device]); // Adiciona novos dispositivos
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan(); // Para o escaneamento após 10 segundos
    }, 10000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      const connected = await device.connect();
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected); // Dispositivo conectado armazenado
      Alert.alert("Conexão bem-sucedida!", `Conectado a: ${device.name || "Dispositivo desconhecido"}`);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao conectar ao dispositivo.");
    }
  };

  const saveDeviceData = (device: Device) => {
    // Armazene os dados do dispositivo em uma base de dados ou AsyncStorage
    console.log("Dispositivo salvo:", {
      id: device.id,
      name: device.name,
    });
    Alert.alert("Sucesso", `Dispositivo ${device.name || "desconhecido"} salvo com sucesso.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conexão Bluetooth</Text>
      {connectedDevice ? (
        <View>
          <Text style={styles.connectedText}>
            Conectado a: {connectedDevice.name || "Dispositivo desconhecido"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => saveDeviceData(connectedDevice)}
          >
            <Text style={styles.buttonText}>Salvar Dispositivo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={startScan}>
            <Text style={styles.buttonText}>Procurar Dispositivos</Text>
          </TouchableOpacity>
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.deviceButton}
                onPress={() => connectToDevice(item)}
              >
                <Text style={styles.deviceText}>{item.name || "Dispositivo desconhecido"}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  connectedText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#0061FF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  deviceButton: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  deviceText: {
    fontSize: 16,
    color: "#333",
  },
});

export default BluetoothConnect;
