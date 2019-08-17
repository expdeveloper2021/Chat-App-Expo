import React, { Component } from 'react'
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants';
import firebase from '../../Config/Fire'

const { width } = Dimensions.get('window');

export default class Carousel extends Component {

    constructor() {
        super()
        this.state = {
            all: []
        }
    }

    static navigationOptions = {
        title: 'Status',
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: 'white',
    };

    async componentDidMount() {
        let uid = await firebase.auth().currentUser.uid
        await firebase.database().ref("users/" + uid + "/status").on("value", (data) => {
            firebase.database().ref(`stories/${data.val()}/allImages`).on("child_added", (dat) => {
                let all = this.state.all
                all.push(dat.val())
                this.setState({ all })
            })
        })
    }

    render() {
        return (
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                >
                    {!!this.state.all.length && this.state.all.map((image) => {
                        return <Image source={{ uri: image }} style={styles.image} key={Math.random()} />
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    scrollContainer: {
        flex: 1,
    },
    image: {
        width,
        flex: 0.8,
    },
});
