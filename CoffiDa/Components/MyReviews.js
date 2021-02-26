import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MyReviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            reviewsData: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getData();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getData = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const user_id = await AsyncStorage.getItem('@user_id');

        this.setState({ isLoading: true });

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
                console.log(responseJson.reviews);
                let myReviews = responseJson.reviews;
                this.setState({
                    isLoading: false,
                    reviewsData: myReviews
                })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteReview = async (location_id, review_id) => {
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id + "/review/" + review_id, {
            method: 'delete',
            headers: {
                'X-Authorization': token
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Review Deleted");
                    Alert.alert("Review Deleted");
                    this.getData();
                } else if (response.status === 400) {
                    console.log("bad request");
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

    setLocID = async (id) => {
        await AsyncStorage.setItem('@location_id', id.toString());
        console.log("AsyncStorage loc id "+id);
    }

    setReviewID = async (id) => {
        await AsyncStorage.setItem('@review_id', id.toString());
        console.log("AsyncStorage rev id "+id);
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
                    <FlatList
                        data={this.state.reviewsData}
                        renderItem={({ item }) => (
                            <View style={styles.middleTouch}>
                                <TouchableOpacity style={styles.formTouch}
                                    onPress={() => { navigation.navigate('SingleReview'); this.setReviewID(item.review.review_id); this.setLocID(item.location.location_id) }}
                                >
                                    <Text style={styles.formTouchText}>{item.location.location_name} {item.review.overall_rating}/5   ➜</Text>
                                </TouchableOpacity>

                                <View style={styles.sideBySide}>
                                    <TouchableOpacity style={styles.formTouch}
                                        onPress={() => { this.deleteReview(item.location.location_id, item.review.review_id) }}
                                    >
                                        <Text style={styles.formTouchText}>Delete Review</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.formTouch}
                                        onPress={() => { navigation.navigate('EditReview'); this.setReviewID(item.review.review_id); this.setLocID(item.location.location_id) }}
                                    >
                                        <Text style={styles.formTouchText}>Edit Review</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={({ id }, index) => id}
                    />
                </View>
            );
        }
    }
}
export default MyReviews; 