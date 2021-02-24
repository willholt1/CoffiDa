import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../Style/Styles';

class Location extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Text>Location</Text>
                <Button
                    title="Reviews List"
                    onPress={() => navigation.navigate('ReviewsList')}
                />
                <Button
                    title="Home"
                    onPress={() => navigation.popToTop()}
                />
            </View>
        );
    }
}

export default Location;