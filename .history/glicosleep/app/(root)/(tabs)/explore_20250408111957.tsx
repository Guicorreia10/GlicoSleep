import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


interface RegistroGlicose {
 id: string;
 data: string;
 dia: string;
 hora: string;
 tipo: 'glicose' | 'exercicio';
 refeicao?: string;
 valorGlicose?: string;
 detalhes?: string;
 duracaoExercicio?: string;
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
];


const Explore = () => {
 const [selectedRegistro, setSelectedRegistro] = useState<RegistroGlicose | null>(null);
 const [modalVisivel, setModalVisivel] = useState(false);


 const renderItem = ({ item }: { item: RegistroGlicose }) => {
 let iconComponent;


 if (item.tipo === 'glicose') {
 iconComponent = <MaterialCommunityIcons name="water-opacity" size={24} color="green" />;
 } else if (item.tipo === 'exercicio') {
 iconComponent = <FontAwesome5 name="biking" size={24} color="green" />;
 } else {
 iconComponent = <Feather name="activity" size={24} color="green" />;
 }


 return (
 <TouchableOpacity onPress={() => {
 setSelectedRegistro(item);
 setModalVisivel(true);
 }}
 style={styles.item}>
 <View style={styles.itemHeader}>
 <Text style={styles.hora}>{item.dia}, {item.hora}</Text>
 <Text style={styles.refeicao}>
 {item.refeicao ? item.refeicao : item.detalhes}
 </Text>
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
