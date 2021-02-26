import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SingleReview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            reviewData: [],
            reviewID: ''
        };
    }

    componentDidMount() {
        this.getData();
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
            })
            .catch((error) => {
                console.log(error);
            })
    }

    likeReview = async () => {
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/review/"+review_id+"/like", {
            method: 'post',
            headers: {
                'X-Authorization': token
            }
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Review Liked");
                Alert.alert("Review Liked");
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

    unlikeReview = async () => {
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/review/"+review_id+"/like", {
            method: 'delete',
            headers: {
                'X-Authorization': token
            }
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("Review Unliked");
                Alert.alert("Review Unliked");
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

                    {this.state.reviewData.filter(
                        review => review.review_id == this.state.reviewID).map(filteredReview => (
                            <View>
                                <Text style={styles.textStyle} >Overall Rating: {filteredReview.overall_rating}/5</Text>
                                <Text style={styles.textStyle} >Price: {filteredReview.price_rating}/5</Text>
                                <Text style={styles.textStyle} >Quality: {filteredReview.quality_rating}/5</Text>
                                <Text style={styles.textStyle} >Clenliness: {filteredReview.clenliness_rating}/5</Text>
                                <Text style={styles.textStyle} >Likes: {filteredReview.likes}</Text>
                                <Text style={styles.textStyle} >{filteredReview.review_body}</Text>
                            </View>))}
                    <View>
                        <TouchableOpacity style={styles.formTouch}
                            onPress={() => this.likeReview()}
                        ><Text style={styles.formTouchText}>Like Review</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.formTouch}
                            onPress={() => this.unlikeReview()}
                        ><Text style={styles.formTouchText}>Unlike Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

export default SingleReview; 