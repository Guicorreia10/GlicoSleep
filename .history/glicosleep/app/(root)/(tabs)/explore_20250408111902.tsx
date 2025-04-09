import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


interface RegistroGlicose {
 id: string;
 data: string;
 dia: string;
 hora: string;
 refeicao: string;
 valor: string;
 detalhesGlicose?: string;
}


const registros: RegistroGlicose[] = [
 {
 id: '1',
 data: '24/04/2019',
 dia: 'Qua',
 hora: '23:01',
 refeicao: 'Antes do jantar',
 valor: '4.4',
 detalhesGlicose: 'Informações adicionais sobre a glicose aqui',
 },
 {
 id: '2',
 data: '24/04/2019',
 dia: 'Qua',
 hora: '12:40',
 refeicao: 'Antes do jantar',
 valor: '3.0',
 detalhesGlicose: 'Mais detalhes sobre a glicose aqui',
 },
 {
 id: '4',
 data: '21/04/2019',
 dia: 'Dom',
 hora: '11:03',
 refeicao: 'Antes do almoço',
 valor: '15.0',
 detalhesGlicose: 'Ainda mais informações sobre a glicose aqui',
 },
 {
 id: '5',
 data: '24/04/2019',
 dia: 'Qua',
 hora: '00:48',
 refeicao: 'Pequeno-almoço',
 valor: '6.0',
 detalhesGlicose: 'Detalhes sobre o pequeno-almoço e a glicose',
 },
];


const Explore = () => {
 const [selectedRegistro, setSelectedRegistro] = useState<RegistroGlicose | null>(null);
 const [modalVisivel, setModalVisivel] = useState(false);


 const renderItem = ({ item }: { item: RegistroGlicose }) => {
 return (
 <TouchableOpacity onPress={() => {
 setSelectedRegistro(item);
 setModalVisivel(true);
 }}
 style={styles.item}>
 <View style={styles.itemHeader}>
 <Text style={styles.hora}>{item.dia}, {item.hora}</Text>
 <Text style={styles.refeicao}>{item.refeicao}</Text>
 </View>
 <View style={styles.itemDetails}>
 <MaterialCommunityIcons name="water-opacity" size={24} color="green" />
 <View style={styles.valorContainer}>
 <Text style={styles.valor}>{item.valor}</Text>
 </View>
 </View>
 </TouchableOpacity>
 );
 };


 return (
 <View style={styles.container}>
 <Text style={styles.header}>Histórico de Glicose</Text>
 <FlatList
 data={registros}
 renderItem={renderItem}
 keyExtractor={(item) => item.id}
 ListHeaderComponent={<View style={{ height: 20 }} />}
 ListFooterComponent={<View style={{ height: 20 }} />}
 />


 <Modal
 animationType="slide"
 transparent={true}
 visible={modalVisivel}
 onRequestClose={() => {
 setModalVisivel(!modalVisivel);
 }}
 >
 <View style={styles.centeredView}>
 <View style={styles.modalView}>
 <Text style={styles.modalTitle}>{selectedRegistro?.refeicao}</Text>
 <Text>
 {selectedRegistro?.detalhesGlicose}
 </Text>
 <TouchableOpacity
 style={[styles.button, styles.buttonClose]}
 onPress={() => setModalVisivel(!modalVisivel)}
 >
 <Text style={styles.textStyle}>Esconder Modal</Text>
 </TouchableOpacity>
 </View>
 </View>
 </Modal>
 </View>
 );
};


const styles = StyleSheet.create({
 container: {
 flex: 1,
 padding: 10,
 backgroundColor: '#f0f0f0',
 },
 header: {
 fontSize: 24,
 fontWeight: 'bold',
 marginBottom: 10,
 textAlign: 'center',
 },
 item: {
 backgroundColor: 'white',
 padding: 10,
 borderRadius: 5,
 marginBottom: 10,
 },
 itemHeader: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 marginBottom: 5,
 },
 hora: {
 fontSize: 16,
 fontWeight: 'bold',
 },
 refeicao: {
 fontSize: 16,
 },
 itemDetails: {
 flexDirection: 'row',
 alignItems: 'center',
 },
 valorContainer: {
 backgroundColor: 'lightgreen',
 padding: 5,
 borderRadius: 5,
 marginLeft: 10,
 },
 valor: {
 fontSize: 16,
 fontWeight: 'bold',
 color: 'green',
 },
 centeredView: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 marginTop: 22,
 },
 modalView: {
 margin: 20,
 backgroundColor: 'white',
 borderRadius: 20,
 padding: 35,
 alignItems: 'center',
 shadowColor: '#000',
 shadowOffset: {
 width: 0,
 height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 4,
 elevation: 5,
 },
 button: {
 borderRadius: 20,
 padding: 10,
 elevation: 2,
 },
 buttonClose: {
 backgroundColor: '#2196F3',
 },
 textStyle: {
 color: 'white',
 fontWeight: 'bold',
 textAlign: 'center',
 },
 modalTitle: {
 marginBottom: 15,
 textAlign: 'center',
 fontSize: 20,
 fontWeight: 'bold',
 },
});


export default Explore;
