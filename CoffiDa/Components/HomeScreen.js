import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';



class HomeScreen extends Component{
  render(){

    const navigation = this.props.navigation;

    return(
        <View>
          <Text>Home Screen</Text>
          <Button
            title = "Location"
            onPress={() => navigation.navigate('Location')}
          />
        </View>
    );
  }
}

export default HomeScreen;
