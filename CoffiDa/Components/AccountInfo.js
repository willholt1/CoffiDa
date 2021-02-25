import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AccountInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            userData: []
        };
    }

    getData = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const user_id = await AsyncStorage.getItem('@user_id');

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + user_id, {
            headers: {
                'X-Authorization': token
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("request successful");
                    return response.json();
                } else if (response.status === 401) {
                    console.log("unauthorised");
                } else if (response.status === 404) {
                    console.log("not found");
                } else {
                    console.log("something went wrong");
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    userData: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const navigation = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="dodgerblue" />
                </View>
            )
        } else {

            return (
                <View style={styles.middleTouch}>
                    <View>
                        <Text style={styles.textStyle} >First name: {this.state.userData.first_name}</Text>
                        <Text style={styles.textStyle} >Last name: {this.state.userData.last_name}</Text>
                        <Text style={styles.textStyle} >Email: {this.state.userData.email}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.formTouch}
                            onPress={() => navigation.navigate('UpdateInfo')}
                        ><Text style={styles.formTouchText}>Update Information</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

export default AccountInfo; 