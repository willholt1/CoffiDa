import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const FavouriteLocations = ( {navigation} ) => {
    return (
        <View>
            <Text>Favourite Locations</Text>
            <Button
                title="Location"
                onPress={() => navigation.navigate('Location')}
            />
        </View>
    );
}

export default FavouriteLocations; 