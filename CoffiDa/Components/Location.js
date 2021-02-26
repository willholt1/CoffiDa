import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Location extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            name: '',
            town: '',
            photoPath: '',
            avgOverall: '',
            avgPrice: '',
            avgQuality: '',
            avgClenliness: ''
        }
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
        const location_id = await AsyncStorage.getItem('@location_id');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id)
            .then((response) => {
                if (response.status === 200) {
                    console.log("get request successful");
                    return response.json();
                } else if (response.status === 404) {
                    console.log("get not found");
                } else {
                    console.log("something went wrong");
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    name: responseJson.location_name,
                    town: responseJson.location_town,
                    photoPath: responseJson.photo_path,
                    avgOverall: responseJson.avg_overall_rating,
                    avgPrice: responseJson.avg_price_rating,
                    avgQuality: responseJson.avg_quality_rating,
                    avgClenliness: responseJson.avg_clenliness_rating
                })
                //console.log(responseJson);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    favouriteLocation = async () => {
        const location_id = await AsyncStorage.getItem('@location_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/favourite", {
            method: 'post',
            headers: {
                'X-Authorization': token
            }
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Location Favorited");
                Alert.alert("Location Favorited");
            } else if (response.status === 400) {
                console.log("bad request");
            } else if (response.status === 401) {
                console.log("unauthorised");
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

    unfavouriteLocation = async () => {
        const location_id = await AsyncStorage.getItem('@location_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/favourite", {
            method: 'delete',
            headers: {
                'X-Authorization': token
            }
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Location Unfavorited");
                Alert.alert("Location Unfavorited");
            } else if (response.status === 401) {
                console.log("unauthorised");
            } else if (response.status === 403) {
                console.log("forbidden");
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
                        <Text style={styles.textStyle} >Name: {this.state.name}</Text>
                        <Text style={styles.textStyle} >Town: {this.state.town}</Text>
                        <Text style={styles.textStyle} >Average Overall Rating: {this.state.avgOverall}/5</Text>
                        <Text style={styles.textStyle} >Average Price Rating: {this.state.avgPrice}/5</Text>
                        <Text style={styles.textStyle} >Average Quality Rating: {this.state.avgQuality}/5</Text>
                        <Text style={styles.textStyle} >Average Clenliness Rating: {this.state.avgClenliness}/5</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.formTouch}
                            onPress={() => this.favouriteLocation()}
                        ><Text style={styles.formTouchText}>Favourite Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.formTouch}
                            onPress={() => this.unfavouriteLocation()}
                        ><Text style={styles.formTouchText}>Unfavourite Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.formTouch}
                            onPress={() => navigation.navigate('ReviewsList')}
                        ><Text style={styles.formTouchText}>Reviews</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

export default Location;