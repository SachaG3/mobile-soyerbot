// src/context/AuthContext.js

import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créer le contexte
export const AuthContext = React.createContext({
    isSignedIn: false,
    signIn: () => {},
    signOut: () => {}
});

// Créer un fournisseur de contexte
export const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    // Se connecter
    const signIn = async (token) => {
        // ...le reste de votre code pour signIn
        setIsSignedIn(true); // Cela mettra à jour l'état global de l'application
    };

    // Se déconnecter
    const signOut = async () => {
        await AsyncStorage.removeItem('userToken');
        setIsSignedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
