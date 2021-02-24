import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class ReviewsList extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Text>Reviews List</Text>
                <Button
                    title="Add Review"
                    onPress={() => navigation.navigate('AddReview')}
                />
                <Button
                    title="Single Review"
                    onPress={() => navigation.navigate('SingleReview')}
                />
                <Button
                    title="Home"
                    onPress={() => navigation.popToTop()}
                />
            </View>
        );
    }
}

export default ReviewsList; 