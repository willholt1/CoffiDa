import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../Style/Styles';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPass: ''
        }
    }

    signUp = () => {
        let inputtedData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        return fetch("http://10.0.2.2:3333/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputtedData)

        })

        .then((response) => {
            Alert.alert("Signup Successful");
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
                        <Text style={styles.formLabel}>First Name:</Text>
                        <TextInput
                            placeholder="enter first name..."
                            style={styles.formInput}
                            onChangeText={(firstName) => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Last Name:</Text>
                        <TextInput
                            placeholder="enter last name..."
                            style={styles.formInput}
                            onChangeText={(lastName) => this.setState({ lastName })}
                            value={this.state.lastName}
                        />
                    </View>

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
                        <Text style={styles.formLabel}>Confirm Password:</Text>
                        <TextInput
                            placeholder="enter password..."
                            style={styles.formInput}
                            secureTextEntry
                            onChangeText={(confirmPass) => this.setState({ confirmPass })}
                            value={this.state.confirmPass}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <TouchableOpacity
                            style={styles.formTouch}
                            onPress={() => this.signUp()}
                        >
                            <Text style={styles.formTouchText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default SignUp; 