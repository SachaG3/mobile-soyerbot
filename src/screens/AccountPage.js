import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountPage = ({ navigation }) => {
     const handleSignOut = async () => {
        await AsyncStorage.removeItem('userToken');
        // Réinitialiser l'état de la navigation
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Assurez-vous que 'Login' est le nom de votre écran de connexion
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mon Compte</Text>
            <Button title="Déconnexion" onPress={handleSignOut} />
            {/* Ajoutez d'autres options de compte ici */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginBottom: 20,
        fontSize: 20,
    },
});

export default AccountPage;
