import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const MyReviews = ( {navigation} ) => {
    return (
        <View>
            <Text>My Reviews</Text>
            <Button
                title="Single Review"
                onPress={() => navigation.navigate('SingleReview')}
            />
            <Button
                title="Edit Review"
                onPress={() => navigation.navigate('EditReview')}
            />
            <Button
                title="Home"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

export default MyReviews; 