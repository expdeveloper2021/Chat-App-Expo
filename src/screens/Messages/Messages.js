import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

export default class Messages extends Component {
    static navigationOptions = {
        title: 'User Name',
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
            <View style={styles.container}>
                <View style={styles.messages}>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "flex-start",
    },
    messages: {
        flex: 1,
        borderWidth: 1,
        margin: 20,
    }
});
