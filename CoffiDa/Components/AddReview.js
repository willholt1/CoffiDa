import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Style/Styles';

class AddReview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      overallRating: 0,
      reviewText: ''
    }
  }

  addReview = async () => {
    const location_id = await AsyncStorage.getItem('@location_id');
    const token = await AsyncStorage.getItem('@session_token');

    let inputtedData = {
      overall_rating: this.state.overallRating,
      price_rating: this.state.priceRating,
      quality_rating: this.state.qualityRating,
      clenliness_rating: this.state.clenlinessRating,
      review_body: this.state.reviewText
    }

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id + "/review", {
      method: 'post',
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputtedData)

    })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert("Review Created");
          this.props.navigation.goBack();
        } else if (response.status === 400) {
          throw "Bad Request";
        } else if (response.status === 401) {
          throw "Unauthorised";
        } else if (response.status === 404) {
          throw "Not Found";
        } else {
          throw "something went wrong";
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
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
            onPress={() => { this.addReview(); }}
          >
            <Text style={styles.formTouchText}>Add Review</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    );
  }
}
export default AddReview; 