import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class AddReview extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Text>Add Review</Text>
                <Button
                    title="Home"
                    onPress={() => navigation.popToTop()}
                />
            </View>
        );
    }
}
export default AddReview; 