import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class FavouriteLocations extends Component {
    render() {
        const navigation = this.props.navigation;
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
}

export default FavouriteLocations; 