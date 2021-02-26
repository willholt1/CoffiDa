import React, { Component } from 'react';
import { Text, View, Button, SafeAreaView, FlatList, ActivityIndicator, Alert, TouchableOpacity, TextInput } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            locationsData: [],
            query:''
        };
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: true });
            this.getData();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getData = async () => {
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/find?q=" + this.state.query, {
            headers: {
                'X-Authorization': token
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("request successful");
                    return response.json();
                } else if (response.status === 400) {
                    console.log("bad request");
                } else if (response.status === 401) {
                    console.log("unauthorised");
                } else {
                    console.log("something went wrong");
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    locationsData: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    setLocID = async (id) => {
        await AsyncStorage.setItem('@location_id', id.toString());
        console.log(id);
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
                <View>
                    <View style={styles.formItem}>
                        <TextInput
                            placeholder="Search"
                            style={styles.formInput}
                            onChangeText={(query) => this.setState({ query })}
                            value={this.state.query}
                        />
                    </View>
                    <View style={styles.formItem}>
                            <TouchableOpacity
                                style={styles.formTouch}
                                onPress={() => {this.getData(); this.setState({isLoading: false});}}
                            >
                                <Text style={styles.formTouchText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    <View>
                        <FlatList
                            data={this.state.locationsData}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity style={styles.formTouch}
                                        onPress={() => {navigation.navigate('Location'); this.setLocID(item.location_id)}}
                                    >
                                        <Text style={styles.formTouchText}>{item.location_name}   ➜</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={({ id }, index) => id}
                        />
                    </View>
                </View>
            );
        }
    }
}

export default HomeScreen;
