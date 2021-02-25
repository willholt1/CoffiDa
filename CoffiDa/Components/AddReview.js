import React, { Component } from 'react';
import { Text, View,  ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import styles from '../Style/Styles';

import { create, PREDEF_RES } from 'react-native-pixel-perfect';

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
    
    
    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <ScrollView>
                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>priceRating</Text>
                        <TextInput
                            placeholder="enter first name..."
                            style={styles.formInput}
                            onChangeText={(firstName) => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                    </View>
                    <NumericInput
          initValue={this.state.priceRating}
          value={this.state.priceRating}
          minValue={0}
          maxValue={5}
          onChange={(priceRating) => this.setState({ priceRating })} />
                   
                    <View style={styles.formItem}>
                        <TouchableOpacity
                            style={styles.formTouch}
                            onPress={() => this.signUp()}
                        >
                            <Text style={styles.formTouchText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}
export default AddReview; 