import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


interface HistoryItem {
 id: string;
 date: string;
 day: string;
 time: string;
 description: string;
 value?: string;
 type: 'glucose' | 'exercise' | 'meal' | 'medication' | 'carb';
 exerciseDetails?: string;
 glucoseDetails?: string;
 mealDetails?: string;
}


const data: HistoryItem[] = [
 {
 id: '1',
 date: '24/04/2019',
 day: 'Wed',
 time: '23:01',
 description: 'Before dinner',
 value: '4.4',
 type: 'glucose',
 glucoseDetails: 'Additional glucose info here',
 },
 {
 id: '2',
 date: '24/04/2019',
 day: 'Wed',
 time: '12:40',
 description: 'Before dinner',
 value: '3.0',
 type: 'glucose',
 glucoseDetails: 'More glucose details here',
 },
 {
 id: '3',
 date: '23/04/2019',
 day: 'Tue',
 time: '15:31',
 description: 'Other',
 value: '4.0',
 type: 'exercise',
 exerciseDetails: 'Walking 14 min (Autodetected walking activity.)',
 },
 {
 id: '4',
 date: '21/04/2019',
 day: 'Sun',
 time: '11:03',
 description: 'Before lunch',
 value: '15.0',
 type: 'glucose',
 glucoseDetails: 'Even more glucose info here',
 },
 {
 id: '5',
 date: '24/04/2019',
 day: 'Wed',
 time: '00:48',
 description: 'Breakfast',
 value: '6.0',
 type: 'meal',
 mealDetails: 'Apidra: 5.00U, Tresiba: 6.00U, Carb: 5.0',
 },
 {
 id: '6',
 date: '24/04/2019',
 day: 'Wed',
 time: '01:07',
 description: 'Before dinner',
 type: 'exercise',
 exerciseDetails: 'Walking 6 min (Autodetected walking activity.)',
 },
];


const Explore = () => {
 const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
 const [modalVisible, setModalVisible] = useState(false);


 const renderItem = ({ item }: { item: HistoryItem }) => {
 let iconComponent;


 switch (item.type) {
 case 'glucose':
 iconComponent = <MaterialCommunityIcons name="water-opacity" size={24} color="green" />;
 break;
 case 'exercise':
 iconComponent = <FontAwesome5 name="biking" size={24} color="green" />;
 break;
 case 'meal':
 iconComponent = <MaterialCommunityIcons name="food-apple" size={24} color="green" />;
 break;
 case 'medication':
 iconComponent = <MaterialCommunityIcons name="pill" size={24} color="green" />;
 break;
 case 'carb':
 iconComponent = <MaterialCommunityIcons name="bread-slice" size={24} color="green" />;
 break;
 default:
 iconComponent = <Feather name="activity" size={24} color="green" />;
 }


 return (
 <TouchableOpacity onPress={() => {
 setSelectedItem(item);
 setModalVisible(true);
 }}
 style={styles.item}>
 <View style={styles.itemHeader}>
 <Text style={styles.time}>{item.day}, {item.time}</Text>
 <Text style={styles.description}>{item.description}</Text>
 </View>
 <View style={styles.itemDetails}>
 {iconComponent}
 {item.value && (
 <View style={styles.valueContainer}>
 <Text style={styles.value}>{item.value}</Text>
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
 data={data}
 renderItem={renderItem}
 keyExtractor={(item) => item.id}
 ListHeaderComponent={<View style={{ height: 20 }} />}
 ListFooterComponent={<View style={{ height: 20 }} />}
 />


 <Modal
 animationType="slide"
 transparent={true}
 visible={modalVisible}
 onRequestClose={() => {
 setModalVisible(!modalVisible);
 }}
 >
 <View style={styles.centeredView}>
 <View style={styles.modalView}>
 <Text style={styles.modalTitle}>{selectedItem?.description}</Text>
 <Text>
 {selectedItem?.exerciseDetails || selectedItem?.glucoseDetails || selectedItem?.mealDetails}
 </Text>
 <TouchableOpacity
 style={[styles.button, styles.buttonClose]}
 onPress={() => setModalVisible(!modalVisible)}
 >
 <Text style={styles.textStyle}>Hide Modal</Text>
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
 time: {
 fontSize: 16,
 fontWeight: 'bold',
 },
 description: {
 fontSize: 16,
 },
 itemDetails: {
 flexDirection: 'row',
 alignItems: 'center',
 },
 valueContainer: {
 backgroundColor: 'lightgreen',
 padding: 5,
 borderRadius: 5,
 marginLeft: 10,
 },
 value: {
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
