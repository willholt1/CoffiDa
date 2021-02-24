import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class AccountInfo extends Component {
    render() {
        const navigation = this.props.navigation;
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
}
export default AccountInfo; 