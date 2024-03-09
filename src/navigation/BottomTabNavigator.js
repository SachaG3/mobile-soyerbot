import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import AccountPage from '../screens/AccountPage';
// Importez d'autres écrans selon vos besoins


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Account" component={AccountPage} />
            {/* autres onglets */}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
