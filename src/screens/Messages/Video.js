import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {
    FontAwesome,
    Entypo
} from '@expo/vector-icons';
import firebase from '../../Config/Fire'


export default class Video extends Component {
    constructor() {
        super()
        this.state = {
            type: Camera.Constants.Type.back,
            color: 'black',
            recording: false,
        }
    }

    static navigationOptions = {
        title: 'Video',
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    async componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA);
        let uid = await firebase.auth().currentUser.uid
        firebase.database().ref("users/" + uid + "/current").on("value", (data) => {
            this.setState({ uid, opponentID: data.val() })
        })
    }

    async capture() {
        this.setState({ color: 'red', recording: true })
        const photo = await this.camera.recordAsync();
        this.setState({ photo })
    }

    async stop() {
        await this.camera.stopRecording();
        this.setState({ color: 'black', recording: false })
        setTimeout(async () => {
            const { photo } = this.state
            let URL = photo.uri
            const response = await fetch(URL);
            const blob = await response.blob();
            let storageRef = firebase.storage().ref().child(`userVideos/${photo.name}`)
            storageRef.put(blob)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((snapUrl) => {
                        let today = new Date()
                        let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                        let msgObj = {
                            snapUrl,
                            created,
                            sender: "me",
                            type: 'video',
                        }
                        firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).push(msgObj).then(() => {
                            msgObj.sender = "opponent"
                            firebase.database().ref(`chatRoom/${this.state.opponentID}/${this.state.uid}`).push(msgObj).then(() => {
                                this.props.navigation.navigate("Messages")
                            })
                        })
                    })
                })
        }, 1000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{ flex: 0.9 }}
                    type={this.state.type}>
                </Camera>
                <View
                    style={{
                        flex: 0.1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'center',
                            marginLeft: 10,
                        }}
                        onPress={() => {
                            this.setState({
                                type:
                                    this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                            });
                        }}>
                        <FontAwesome name="rotate-right" size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignSelf: 'flex-start',
                            alignItems: 'center',
                        }}
                        onPress={() => this.state.recording ? this.stop() : this.capture()}>
                        <Entypo name="controller-record" size={60} style={{ color: this.state.color }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
