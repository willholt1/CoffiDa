import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
im

import HomeScreen from './Components/HomeScreen';
import Location from './Components/Location'

const Stack = createStackNavigator();

export default function App() { 
  return (   
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Location" component={Location} />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}
