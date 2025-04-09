import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


interface HistoryItem {
 id: string;
 date: string;
 day: string;
 time: string;
 description: string;
 value?: string;
 type: 'glucose' | 'exercise' | 'meal' | 'medication' | 'carb';
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
 },
 {
 id: '2',
 date: '24/04/2019',
 day: 'Wed',
 time: '12:40',
 description: 'Before dinner',
 value: '3.0',
 type: 'glucose',
 },
 {
 id: '3',
 date: '23/04/2019',
 day: 'Tue',
 time: '15:31',
 description: 'Other',
 value: '4.0',
 type: 'exercise',
 },
 {
 id: '4',
 date: '21/04/2019',
 day: 'Sun',
 time: '11:03',
 description: 'Before lunch',
 value: '15.0',
 type: 'glucose',
 },
];


const Explore = () => {
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
 <View style={styles.item}>
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
 </View>
 );
 };


 const renderSectionHeader = ({ section: { date } }: any) => (
 <View style={styles.sectionHeader}>
 <Text style={styles.sectionText}>{date}</Text>
 </View>
 );


 const groupedData = data.reduce((acc: any, item) => {
 if (!acc[item.date]) {
 acc[item.date] = { date: item.date, data: [] };
 }
 acc[item.date].data.push(item);
 return acc;
 }, {});


 const sections = Object.values(groupedData).sort((a: any, b: any) =>
 b.date.localeCompare(a.date)
 );


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
 sectionHeader: {
 backgroundColor: '#4682B4',
 padding: 10,
 borderRadius: 5,
 marginTop: 10,
 },
 sectionText: {
 fontSize: 18,
 fontWeight: 'bold',
 color: 'white',
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
});


export default Explore;
