import React, { Component } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogOut extends Component {
    logOut = async () => {
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
            headers: {
                'X-Authorization': token
            }
        })
        .then(async (response) => {
            if (response.status === 200) {
                await AsyncStorage.removeItem("@session_token");
                Alert.alert("LogOut Successful");
            } else if (response.status === 401) {
                throw "Unauthorised";
            } else {
                throw "something went wrong";
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Button
                    title="Log Out"
                    onPress={() => this.logOut()}
                />
            </View>
        );
    }
}
export default LogOut; 