import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import {MainStack, AccountStack, FavouriteLocationsStack, LikedReviewsStack, MyReviewsStack, LoginStack, SignUpStack, LogOutStack} from './StackNavigation';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
    return (
        <Drawer.Navigator  drawerType="back" headerShown="false">
            <Drawer.Screen name="Home" component={MainStack} />
            <Drawer.Screen name="Account information" component={AccountStack} />
            <Drawer.Screen name="Favourite Locations" component={FavouriteLocationsStack} />
            <Drawer.Screen name="Liked Reviews" component={LikedReviewsStack} />
            <Drawer.Screen name="My Reviews" component={MyReviewsStack} />
            <Drawer.Screen name="LogOut" component={LogOutStack}/>
        </Drawer.Navigator>
    );
}

const DrawerSO = () => {
    return(
        <Drawer.Navigator  drawerType="back">
            <Drawer.Screen name="Login" component={LoginStack} />
            <Drawer.Screen name="Signup" component={SignUpStack} />
        </Drawer.Navigator>
    )
}

export { MainDrawer, DrawerSO };