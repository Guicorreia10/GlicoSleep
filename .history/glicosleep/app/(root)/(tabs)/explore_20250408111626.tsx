import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';


interface HistoryItem {
 id: string;
 date: string;
 time: string;
 description: string;
 value?: string;
 type: 'glucose' | 'exercise' | 'meal' | 'medication' | 'carb';
}


const data: HistoryItem[] = [
 {
 id: '1',
 date: '24/04/2019',
 time: '23:01',
 description: 'Before dinner',
 value: '4.4',
 type: 'glucose',
 },
 {
 id: '2',
 date: '24/04/2019',
 time: '12:40',
 description: 'Before dinner',
 value: '3.0',
 type: 'glucose',
 },
 {
 id: '3',
 date: '23/04/2019',
 time: '15:31',
 description: 'Other',
 value: '4.0',
 type: 'exercise',
 },
 {
 id: '4',
 date: '21/04/2019',
 time: '11:03',
 description: 'Before lunch',
 value: '15.0',
 type: 'glucose',
 },
];


const Explore = () => {
 const renderItem = ({ item }: { item: HistoryItem }) => (
 <View style={styles.item}>
 <Text style={styles.time}>{item.time}</Text>
 <Text style={styles.description}>{item.description}</Text>
 {item.value && <Text style={styles.value}>{item.value}</Text>}
 </View>
 );


 return (
 <View style={styles.container}>
 <Text style={styles.header}>Histórico</Text>
 <FlatList
 data={data}
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
 },
 header: {
 fontSize: 24,
 fontWeight: 'bold',
 marginBottom: 20,
 },
 item: {
 padding: 10,
 borderBottomWidth: 1,
 borderBottomColor: '#ddd',
 },
 time: {
 fontSize: 16,
 fontWeight: 'bold',
 },
 description: {
 fontSize: 14,
 },
 value: {
 fontSize: 16,
 color: 'green',
 },
});


export default Explore;
