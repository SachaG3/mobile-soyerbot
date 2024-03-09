import React, {useContext, useState} from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';


const LoginForm = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [emailError, setEmailError] = useState('');
    const { signIn } = useContext(AuthContext);
    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert("Erreur", "Le champ e-mail ne peut pas être vide.");
            return; // Arrêter l'exécution si le champ est vide
        }

        // Vérifier le format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Erreur", "Le format de l'adresse e-mail n'est pas valide.");
            return; // Arrêter l'exécution si le format de l'email n'est pas valide
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }),
        };

        try {
            const response = await fetch('https://www.soyerbot.fr/api/reset-password', requestOptions);
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la tentative de réinitialisation du mot de passe.'); // Message générique pour les erreurs
            }
            // Utiliser un message générique aussi pour le succès pour ne pas révéler si l'e-mail est enregistré
            Alert.alert("Demande reçue", "Si votre adresse e-mail est reconnue, un lien de réinitialisation vous a été envoyé.");
        } catch (error) {
            // Vous pouvez choisir de garder ce message d'erreur générique ou d'afficher l'erreur spécifique retournée par l'API
            Alert.alert("Erreur", "Impossible de traiter votre demande pour le moment. Veuillez réessayer plus tard.");
        }
    };

    const handleLogin = async () => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setEmailError('L\'adresse e-mail n\'est pas valide.');
            return; // Stoppe la fonction si l'email n'est pas valide
        } else {
            setEmailError(''); // Réinitialise le message d'erreur si l'email est validé
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        };
        try {
            const response = await fetch('https://www.soyerbot.fr/api/login', requestOptions);
            const data = await response.json();
            if (!response.ok) {
                Alert.alert("Erreur de connexion", data.message || 'Une erreur est survenue');
            } else {
                await AsyncStorage.setItem('userToken', data.token); // Supposons que data.token est votre token
                signIn(data.token); // Appel de la fonction passée en prop pour mettre à jour l'état dans App.js
            }
        } catch (error) {
            Alert.alert("Erreur", "Impossible de se connecter au serveur ou une erreur est survenue");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError(''); // Réinitialise le message d'erreur lors de la saisie
                    }}
                />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#aaa"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setPasswordVisibility(!passwordVisibility)}>
                    <Feather name={passwordVisibility ? 'eye' : 'eye-off'} size={20} color="#aaa" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleResetPassword}>
                <Text style={styles.resetPasswordLink}>Réinitialiser son mot de passe</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#1a1a1a',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#aaa',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        color: '#fff',
    },
    eyeIcon: {
        padding: 5,
    },
    button: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    resetPasswordLink: {
        color: '#aaa',
        marginTop: 15,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default LoginForm;