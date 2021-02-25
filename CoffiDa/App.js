import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerSO, MainDrawer } from './Navigation/DrawerNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        };
    }

    tokenCheck = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        if (token == null){
            this.setState({
                loggedIn: false
            })
        }else{
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {
        this.tokenCheck();
        let Drawer;
        if (this.state.loggedIn) {
            Drawer = <MainDrawer />;
        } else {
            Drawer = <DrawerSO />
        }

        return (
            <NavigationContainer>
                {Drawer}
            </NavigationContainer>
        );
    }
}

export default App;