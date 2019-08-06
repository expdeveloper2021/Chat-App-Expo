import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
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
            uid: ''
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
        let uid = this.state.uid
        const response = await fetch(photos);
        const blob = await response.blob();
        console.log(blob, '///sada')
        let storageRef = firebase.storage().ref().child(`userimages/${photo.name}`)
        storageRef.put(blob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((snapUrl) => {
                    let obj = {
                        snapUrl,
                        uid,
                    }
                    firebase.database().ref("users/" + uid).on("value" , (data)=>{
                        obj.name = data.val().info.name
                    })
                    firebase.database().ref(`stories/${uid}`).push(obj).then(() => {
                        this.props.navigation.navigate("Home")
                    })
                })
            })
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
                        onPress={() => this.capture()}>
                        <Entypo name="camera" size={60} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
