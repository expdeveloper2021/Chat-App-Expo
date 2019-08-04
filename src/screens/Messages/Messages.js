import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image, } from 'react-native'
import {
    AntDesign,
    FontAwesome, Entypo
} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { TextInput } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
// import { Audio } from "expo-av";
// import * as FileSystem from 'expo-file-system';
import firebase from '../../Config/Fire'

export default class Messages extends Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            clicked: '',
            msg: '',
            msgArr: [],
        }
    }

    async componentDidMount() {
        let uid = await firebase.auth().currentUser.uid
        firebase.database().ref("users/" + uid + "/current").on("value", (data) => {
            this.setState({ uid, opponentID: data.val() })
        })
        firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).on("child_added", (data) => {
            let msgArr = this.state.msgArr
            msgArr.push(data.val())
            this.setState({ msgArr })
        })
    }

    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center' },
        title: 'User Name',
        headerStyle: {
            backgroundColor: 'red',
            textAlign: "center"
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    camera() {
        Permissions.askAsync(Permissions.CAMERA);
        this.setState({ clicked: 'Camera' })
    }

    video() {
        Permissions.askAsync(Permissions.CAMERA);
        this.setState({ clicked: 'Video' })
    }

    async photo() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
        })
    }

    audio() {
        Permissions.askAsync(Permissions.AUDIO_RECORDING);
        console.log("Audio Recording nahi horahi bhau")
        // const recording = new Audio.Recording();
        // try {
        //     await recording.prepareToRecordAsync(this.recordingSettings);
        //     recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);
        //     await recording.startAsync()
        // } catch (error) {
        //     console.log(error)
        // }
    }


    capture() {
        this.setState({ clicked: '' })
        console.log("Picture Shooted")
    }

    record() {
        console.log("Video Shooted")
        this.setState({ clicked: '' })
    }

    send() {
        let msg = this.state.msg
        let today = new Date()
        let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let msgObj = {
            msg,
            created,
            sender: "me"
        }
        firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).push(msgObj).then(() => {
            msgObj.sender = "opponent"
            firebase.database().ref(`chatRoom/${this.state.opponentID}/${this.state.uid}`).push(msgObj).then(()=>{
                this.setState({msg: ''})
            })
        })
    }

    render() {
        return (
            this.state.clicked === '' ? <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled>
                    <View style={styles.messages}>
                        <ScrollView>
                            {!!this.state.msgArr && this.state.msgArr.map((e) => {
                                if (e.sender === 'me') {
                                    return <View style={styles.mine}><Text>{e.msg}</Text></View>
                                } else {
                                    return <View style={styles.your}><Text>{e.msg}</Text></View>
                                }
                            })}
                        </ScrollView>
                        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                            <TouchableOpacity onPress={() => this.video()}><Text><FontAwesome name="video-camera" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.camera()}><Text><AntDesign name="camera" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.audio()}><Text><FontAwesome name="microphone" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity><Text><Entypo name="emoji-happy" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity><Text> <Entypo name="location-pin" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.photo()}><Text><AntDesign name="picture" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity><Text><AntDesign name="addfile" size={26} /></Text></TouchableOpacity>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ width: "80%" }}>
                                <TextInput
                                    placeholder='Type message here.. '
                                    value={this.state.msg}
                                    autoCapitalize="words"
                                    returnKeyType="send"
                                    onChangeText={msg => this.setState({ msg })}
                                    onSubmitEditing={this.send.bind(this)}
                                />
                            </View>
                            <View style={{ width: "20%", justifyContent: 'center', marginLeft: 10 }}>
                                <TouchableOpacity onPress={this.send.bind(this)}>
                                    <Image source={{ uri: 'https://static.thenounproject.com/png/1015742-200.png' }}
                                        style={{ width: 60, height: 60 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View> : this.state.clicked === 'Camera' ? <View style={{ flex: 1 }}>
                <Camera
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
            </View> : this.state.clicked === 'Video' && <View style={{ flex: 1 }}>
                <Camera
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
                        onPress={() => this.record()}>
                        <Entypo name="controller-record" size={60} style={{ color: 'red' }} />
                    </TouchableOpacity>
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
        margin: 5,
    },
    mine: {
        width: "80%",
        height: "auto",
        padding: 10,
        backgroundColor: "#058bf2",
        color: "black",
        marginTop: 10,
        alignSelf: "flex-end",
        borderRadius: 10,
    },
    your: {
        width: "80%",
        padding: 10,
        height: "auto",
        backgroundColor: "#e6e2da",
        color: "black",
        marginTop: 10,
        alignSelf: "flex-start",
        borderRadius: 10,
    },
});
