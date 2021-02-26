import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UpdateInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userData: [],
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: ''
    }
  }

  componentDidMount() {
    this.getData();
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
          console.log("get request successful");
          return response.json();
        } else if (response.status === 401) {
          console.log("unauthorised get");
        } else if (response.status === 404) {
          console.log("get not found");
        } else {
          console.log("something went wrong");
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson,
          firstName: responseJson.first_name,
          lastName: responseJson.last_name,
          email: responseJson.email
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  updateUsr = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const user_id = await AsyncStorage.getItem('@user_id');

    console.log("inputted data:", this.state.firstName);
    console.log("Database value:", this.state.userData.first_name);


    let inputtedData = {};
    if (this.state.firstName !== this.state.userData.first_name) {
      inputtedData['first_name'] = this.state.firstName;
    }

    if (this.state.lastName !== this.state.userData.last_name) {
      inputtedData['last_name'] = this.state.lastName;
    }

    if (this.state.email !== this.state.userData.email) {
      inputtedData['email'] = this.state.email;
    }

    if ((this.state.password !== this.state.userData.password) && (this.state.password === this.state.confirmPass) && (this.state.password != '')) {
      inputtedData['password'] = this.state.firstName;
    }

    console.log("inputted data: ", inputtedData);

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + user_id, {
      method: 'patch',
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputtedData)
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("update request successful");
          Alert.alert("Information Updated");
          this.props.navigation.goBack();
          return response.json();
        } else if (response.status === 400) {
          console.log("Bad patch request");
        } else if (response.status === 401) {
          console.log("unauthorised patch");
        } else if (response.status === 403) {
          console.log("Forbidden");
        } else if (response.status === 404) {
          console.log("not found");
        } else {
          console.log("something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    } else {

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
                onPress={() => { this.updateUsr(); }}
              >
                <Text style={styles.formTouchText}>Update</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      );
    }
  }
}

export default UpdateInfo; 