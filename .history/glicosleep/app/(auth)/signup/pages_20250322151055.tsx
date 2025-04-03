import {View, Text, StyleSheet} from 'react-native';




export default function Signup() {
    return (
        <View style={styles.container}>
            <Text>Página de Registo</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {    
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});