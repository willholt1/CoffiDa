import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';

const AddReview = ( {navigation} ) => {
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

export default AddReview; 