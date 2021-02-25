import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
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
        this.getData();
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
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    favouriteLocation = async () => {
    
    }

    unfavouriteLocation = async () => {
    
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