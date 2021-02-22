import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import {MainStack, AccountStack, FavouriteLocationsStack, LikedReviewsStack, MyReviewsStack} from './StackNavigation';

import Login from '../Components/LogIn';
import Signup from '../Components/SignUp';


const Drawer = createDrawerNavigator();

const MainDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={MainStack} />
            <Drawer.Screen name="Account information" component={AccountStack} />
            <Drawer.Screen name="Favourite Locations" component={FavouriteLocationsStack} />
            <Drawer.Screen name="Liked Reviews" component={LikedReviewsStack} />
            <Drawer.Screen name="My Reviews" component={MyReviewsStack} />
        </Drawer.Navigator>
    );
}

const DrawerSO = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="HomeScreenSO" component={MainStack} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Signup" component={Signup} />
        </Drawer.Navigator>
    )
}

export { MainDrawer, DrawerSO };