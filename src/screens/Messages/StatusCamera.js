import React, { Component } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {
    FontAwesome,
    Entypo
} from '@expo/vector-icons';
import firebase from '../../Config/Fire'

export default class StatusCamera extends Component {
    constructor() {
        super()
        this.state = {
            type: Camera.Constants.Type.back,
            uid: '',
            loader: false,
        }
    }

    static navigationOptions = {
        title: 'Camera',
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
        this.setState({ uid })
    }

    async capture() {
        const photo = await this.camera.takePictureAsync();
        let photos = photo.uri
        this.setState({ loader: true })
        let uid = this.state.uid
        let response = await fetch(photos);
        let blob = await response.blob();
        setTimeout(() => {
            let storageRef = firebase.storage().ref().child(`statusImages/${blob._data.name}`)
            storageRef.put(blob)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((snapUrl) => {
                        firebase.database().ref(`stories/${uid}/allImages`).push(snapUrl).then(() => {
                            this.props.navigation.navigate("Home")
                        })
                    })
                })
        }, 2000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loader ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} /> : <>
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
                            onPress={() => this.capture()}>
                            <Entypo name="camera" size={60} />
                        </TouchableOpacity>
                    </View>
                </>}
            </View>
        )
    }
}
