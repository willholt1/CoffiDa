import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Alert, TextInput } from 'react-native';
import styles from '../Style/Styles';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditReview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            priceRatingDB: 0,
            qualityRatingDB: 0,
            clenlinessRatingDB: 0,
            overallRatingDB: 0,
            reviewTextDB: '',
            priceRating: 0,
            qualityRating: 0,
            clenlinessRating: 0,
            overallRating: 0,
            reviewText: '',
            isLoading: true,
            reviewData: [],
            reviewID: ''
        }
    }

    componentDidMount() {
        this.getData();
    }

    filterData = () => {
        this.state.reviewData.filter(
            review => review.review_id == this.state.reviewID).map(filteredReview => (
                this.setState({
                    priceRating: filteredReview.price_rating,
                    qualityRating: filteredReview.quality_rating,
                    clenlinessRating: filteredReview.clenliness_rating,
                    overallRating: filteredReview.overall_rating,
                    reviewText: filteredReview.review_body,
                    priceRatingDB: filteredReview.price_rating,
                    qualityRatingDB: filteredReview.quality_rating,
                    clenlinessRatingDB: filteredReview.clenliness_rating,
                    overallRatingDB: filteredReview.overall_rating,
                    reviewTextDB: filteredReview.review_body
                })
            ));
    }

    getData = async () => {
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');

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
                let reviews = responseJson.location_reviews;
                this.setState({
                    isLoading: false,
                    reviewData: reviews,
                    reviewID: review_id
                })
                this.filterData();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateReview = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');


        console.log("inputted data:", this.state.reviewText);
        console.log("Database value:", this.state.reviewTextDB);


        let inputtedData = {};
        if (this.state.overallRating != this.state.overallRatingDB) {
            inputtedData['overall_rating'] = this.state.overallRating;
        }
        
        if (this.state.priceRating != this.state.priceRatingDB) {
            inputtedData['price_rating'] = this.state.price_rating;
        }

        if (this.state.qualityRating != this.state.qualityRatingDB) {
            inputtedData['quality_rating'] = this.state.qualityRating;
        }

        if (this.state.clenlinessRating != this.state.clenlinessRatingDB) {
            inputtedData['clenliness_rating'] = this.state.clenlinessRating;
        }

        if (this.state.reviewText != this.state.reviewTextDB) {
            inputtedData['review_body'] = this.state.reviewText;
        }

        console.log("inputted data: ", inputtedData);

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id + "/review/" + review_id, {
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
                    Alert.alert("Review Updated");
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
        const navigation = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="dodgerblue" />
                </View>
            )
        } else {
            return (
                <ScrollView>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Review:</Text>
                        <TextInput
                            placeholder="enter your review..."
                            style={styles.formInput}
                            multiline
                            numberOfLines={4}
                            onChangeText={(reviewText) => this.setState({ reviewText })}
                            value={this.state.reviewText}
                        />
                    </View>
                    <View style={styles.numInput}>
                        <Text style={styles.formLabel}>Price Rating:</Text>
                        <NumericInput
                            initValue={this.state.priceRating}
                            value={this.state.priceRating}
                            minValue={0}
                            maxValue={5}
                            rounded
                            iconStyle={{ fontSize: 20, color: 'aliceblue' }}
                            rightButtonBackgroundColor='dodgerblue'
                            leftButtonBackgroundColor='dodgerblue'
                            onChange={(priceRating) => this.setState({ priceRating })} />
                    </View>
                    <View style={styles.numInput}>
                        <Text style={styles.formLabel}>Quality Rating:</Text>
                        <NumericInput
                            initValue={this.state.qualityRating}
                            value={this.state.qualityRating}
                            minValue={0}
                            maxValue={5}
                            rounded
                            iconStyle={{ fontSize: 20, color: 'aliceblue' }}
                            rightButtonBackgroundColor='dodgerblue'
                            leftButtonBackgroundColor='dodgerblue'
                            onChange={(qualityRating) => this.setState({ qualityRating })} />
                    </View>
                    <View style={styles.numInput}>
                        <Text style={styles.formLabel}>Clenliness Rating:</Text>
                        <NumericInput
                            initValue={this.state.clenlinessRating}
                            value={this.state.clenlinessRating}
                            minValue={0}
                            maxValue={5}
                            rounded
                            iconStyle={{ fontSize: 20, color: 'aliceblue' }}
                            rightButtonBackgroundColor='dodgerblue'
                            leftButtonBackgroundColor='dodgerblue'
                            onChange={(clenlinessRating) => this.setState({ clenlinessRating })} />
                    </View>
                    <View style={styles.numInput}>
                        <Text style={styles.formLabel}>Overall Rating:</Text>
                        <NumericInput
                            initValue={this.state.overallRating}
                            value={this.state.overallRating}
                            minValue={0}
                            maxValue={5}
                            rounded
                            iconStyle={{ fontSize: 20, color: 'aliceblue' }}
                            rightButtonBackgroundColor='dodgerblue'
                            leftButtonBackgroundColor='dodgerblue'
                            onChange={(overallRating) => this.setState({ overallRating })} />
                    </View>
                    <View style={styles.formItem}>
                        <TouchableOpacity
                            style={styles.formTouch}
                            onPress={() => {this.updateReview(); }}
                        >
                            <Text style={styles.formTouchText}>Update Review</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            );
        }
    }
}

export default EditReview; 