import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FavouriteLocations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            locationsData: []
        };
    }
    
    componentDidMount() {
        this.setState({ isLoading: true });
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
                let favouriteLocations = responseJson.favourite_locations;
                this.setState({
                    isLoading: false,
                    locationsData: favouriteLocations
                })
                console.log(this.state.locationsData);
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
                <View style={styles.middleTouch}>
                    <FlatList
                        data={this.state.locationsData}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity style={styles.formTouch}
                                    onPress={() => { navigation.navigate('Location'); this.setLocID(item.location_id) }}
                                >
                                    <Text style={styles.formTouchText}>{item.location_name}   ➜</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={({ id }, index) => id}
                    />
                </View>
            );
        }
    }
}

export default FavouriteLocations; 