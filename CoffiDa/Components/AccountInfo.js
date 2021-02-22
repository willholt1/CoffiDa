import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const AccountInfo = ( {navigation} ) => {
    return (
        <View>
            <Text>Account Info</Text>
            <Button
                title="UpdateInfo"
                onPress={() => navigation.navigate('UpdateInfo')}
            />
        </View>
    );
}

export default AccountInfo; 