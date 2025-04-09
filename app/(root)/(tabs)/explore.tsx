import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


interface RegistroGlicose {
 id: string;
 data: string;
 dia: string;
 hora: string;
 tipo: 'glicose' | 'exercicio' | 'refeicao';
 refeicao?: string;
 valorGlicose?: string;
 detalhes?: string;
 duracaoExercicio?: string;
 carboidratos?: string;
 apidra?: string;
 tresiba?: string;
}


const registros: RegistroGlicose[] = [
 {
 id: '1',
 data: '24/04/2019',
 dia: 'Qua',
 hora: '23:01',
 tipo: 'exercicio',
 detalhes: 'Caminhada de 2 min (Autodetectada)',
 },
 {
 id: '2',
 data: '24/04/2019',
 dia: 'Qua',
 hora: '12:40',
 tipo: 'glicose',
 refeicao: 'Antes do jantar',
 valorGlicose: '4.4',
 },
 {
 id: '3',
 data: '23/04/2019',
 dia: 'Ter',
 hora: '15:31',
 tipo: 'exercicio',
 detalhes: 'Caminhada de 14 min (Autodetectada)',
 },
 {
 id: '4',
 data: '21/04/2019',
 dia: 'Dom',
 hora: '11:03',
 tipo: 'glicose',
 refeicao: 'Antes do almoço',
 valorGlicose: '15.0',
 },
 {
 id: '5',
 data: '24/04/2019',
 dia: 'Qua',
 hora: '00:48',
 tipo: 'refeicao',
 refeicao: 'Pequeno-almoço',
 valorGlicose: '6.0',
 apidra: '5.00U',
 tresiba: '6.00U',
 carboidratos: '5.0',
 },
 {
 id: '6',
 data: '24/04/2019',
 dia: 'Qua',
 hora: '01:07',
 tipo: 'exercicio',
 detalhes: 'Caminhada de 6 min (Autodetectada)',
 },
];


const Explore = () => {
 const [selectedRegistro, setSelectedRegistro] = useState<RegistroGlicose | null>(null);
 const [modalVisivel, setModalVisivel] = useState(false);


 const renderItem = ({ item }: { item: RegistroGlicose }) => {
 let iconComponent;


 if (item.tipo === 'glicose') {
 iconComponent = (
 <View style={styles.iconBackground}>
 <MaterialCommunityIcons name="water-opacity" size={16} color="white" />
 </View>
 );
 } else if (item.tipo === 'exercicio') {
 iconComponent = (
 <View style={styles.iconBackground}>
 <FontAwesome5 name="bicycle" size={16} color="white" />
 </View>
 );
 } else if (item.tipo === 'refeicao') {
 iconComponent = (
 <View style={styles.iconBackground}>
 <Ionicons name="fast-food-outline" size={16} color="white" />
 </View>
 );
 } else {
 iconComponent = (
 <View style={styles.iconBackground}>
 <Feather name="activity" size={16} color="white" />
 </View>
 );
 }


 return (
 <TouchableOpacity onPress={() => {
 setSelectedRegistro(item);
 setModalVisivel(true);
 }}
 style={styles.item}>
 <View style={styles.itemHeader}>
 <View style={styles.timeContainer}>
 <Text style={styles.hora}>{item.dia}, {item.hora}</Text>
 </View>
 <View style={styles.refeicaoContainer}>
 <Text style={styles.refeicao}>
 {item.refeicao ? item.refeicao : item.detalhes}
 </Text>
 </View>
 </View>
 <View style={styles.itemDetails}>
 {iconComponent}
 {item.valorGlicose && (
 <View style={styles.valorContainer}>
 <Text style={styles.valor}>{item.valorGlicose}</Text>
 </View>
 )}
 </View>
 </TouchableOpacity>
 );
 };


 return (
 <View style={styles.container}>
 <Text style={styles.header}>Histórico</Text>
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
 <Text style={styles.modalTitle}>
 {selectedRegistro?.refeicao ? selectedRegistro?.refeicao : 'Exercício'}
 </Text>
 <Text>
 {selectedRegistro?.detalhes}
 {selectedRegistro?.valorGlicose && `\nGlicose: ${selectedRegistro.valorGlicose}`}
 {selectedRegistro?.apidra && `\nApidra: ${selectedRegistro.apidra}`}
 {selectedRegistro?.tresiba && `\nTresiba: ${selectedRegistro.tresiba}`}
 {selectedRegistro?.carboidratos && `\nCarboidratos: ${selectedRegistro.carboidratos}`}
 </Text>
 <TouchableOpacity
 style={[styles.button, styles.buttonClose]}
 onPress={() => setModalVisivel(!modalVisivel)}
 >
 <Text style={styles.textStyle}>Voltar</Text>
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
 flexDirection: 'column',
 justifyContent: 'space-between',
 marginBottom: 5,
 },
 timeContainer: {
 marginBottom: 5,
 },
 hora: {
 fontSize: 16,
 fontWeight: 'bold',
 },
 refeicaoContainer: {
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
 iconBackground: {
 backgroundColor: 'green',
 borderRadius: 12,
 width: 24,
 height: 24,
 justifyContent: 'center',
 alignItems: 'center',
 },
});


export default Explore;
