// src/navigation/StackNavigator.js

import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext'; // Supposons que vous ayez un contexte d'authentification
import LoginForm from '../screens/LoginForm';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
    const { isSignedIn } = useContext(AuthContext); // Utilisez useContext pour accéder à votre état d'authentification

    return (
        <Stack.Navigator>
            {isSignedIn ? (
                // Si l'utilisateur est connecté, le premier écran sera le BottomTabNavigator
                <Stack.Screen name="Home" component={BottomTabNavigator} />
            ) : (
                // Sinon, le premier écran sera le LoginForm
                <Stack.Screen name="Login" component={LoginForm} />
            )}
            {/* Vous pouvez ajouter d'autres écrans ici qui ne dépendent pas de l'état de connexion */}
        </Stack.Navigator>
    );
}

export default StackNavigator;
