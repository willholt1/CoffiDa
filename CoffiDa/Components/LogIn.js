import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../Style/Styles';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    login = () => {
        let loginData = {
            email: this.state.email,
            password: this.state.password
        }

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)

        })
        .then((response) => {
            if(response.status === 200){
                Alert.alert('Login Successful');
                console.log('success');
                return response.json();
            }else if(response.status === 400){
                throw 'Invalid email/password';
            }else{
                throw 'something went wrong';
            }
        })
        .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token);
            await AsyncStorage.setItem('@user_id', responseJson.id.toString());
            console.log(responseJson.id);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Email:</Text>
                        <TextInput
                            placeholder="enter email..."
                            style={styles.formInput}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Password:</Text>
                        <TextInput
                            placeholder="enter password..."
                            style={styles.formInput}
                            secureTextEntry
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <TouchableOpacity
                            style={styles.formTouch}
                            onPress={() => this.login()}
                        >
                            <Text style={styles.formTouchText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Login; 