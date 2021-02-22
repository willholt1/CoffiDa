import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const EditReview = ( {navigation} ) => {
    return (
        <View>
            <Text>Edit Review</Text>
            <Button
                title="Home"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

export default EditReview; 