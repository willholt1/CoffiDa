import React, { Component } from 'react';
import { Text, View, Button, SafeAreaView, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            locationsData: []
        };
    }



    getData = async () => {
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/find?price_rating=3", {
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

    componentDidMount() {
        this.getData();
    }

    render() {
        const navigation = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="dodgerblue"/>
                </View>
            )
        } else {

            return (
                <View>
                    <FlatList 
                        data={this.state.locationsData}
                        renderItem={({item, index}) => (
                            <View>
                                <TouchableOpacity style={styles.formTouch}
                                    onPress={() => navigation.navigate('Location')}
                                >
                                    <Text style={styles.formTouchText}>{item.location_name}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>

            );
        }
    }
}

export default HomeScreen;
