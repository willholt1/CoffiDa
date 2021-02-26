import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ReviewsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      reviewsData: []
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
          reviewsData: responseJson.location_reviews
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  setReviewID = async (id) => {
    await AsyncStorage.setItem('@review_id', id.toString());
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
            data={this.state.reviewsData}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={styles.formTouch}
                  onPress={() => { navigation.navigate('SingleReview'); this.setReviewID(item.review_id) }}
                >
                  <Text style={styles.formTouchText}>{item.review_body}   ➜</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ id }, index) => id}
          />
          <View>
            <TouchableOpacity style={styles.formTouch}
              onPress={() => navigation.navigate('AddReview')}
            ><Text style={styles.formTouchText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

export default ReviewsList; 