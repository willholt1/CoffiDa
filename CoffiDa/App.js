import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerSO, MainDrawer } from './Navigation/DrawerNavigation';

export default function App() {
    return (
        <NavigationContainer>
            <DrawerSO/>
        </NavigationContainer>
    );
}

