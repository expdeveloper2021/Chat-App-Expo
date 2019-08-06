import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Audio extends Component {

    static navigationOptions = {
        title: 'Audio Recording',
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View>
                <Text>Hello World</Text>
            </View>
        )
    }
}

