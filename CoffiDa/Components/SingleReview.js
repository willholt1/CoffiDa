import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class SingleReview extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Text>Single Review</Text>
                <Button
                    title="Home"
                    onPress={() => navigation.popToTop()}
                />
            </View>
        );
    }
}

export default SingleReview; 