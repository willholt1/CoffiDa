import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const HomeScreen = ( {navigation} ) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Location"
                onPress={() => navigation.navigate('Location')}
            />
        </View>
    );
}

export default HomeScreen;
