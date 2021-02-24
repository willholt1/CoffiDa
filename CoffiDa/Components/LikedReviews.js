import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class LikedReviews extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Text>Liked Reviews</Text>
                <Button
                    title="Single Review"
                    onPress={() => navigation.navigate('SingleReview')}
                />
            </View>
        );
    }
}

export default LikedReviews; 