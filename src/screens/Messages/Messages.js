import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image, } from 'react-native'
import {
    AntDesign,
    FontAwesome, Entypo
} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { TextInput } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import firebase from '../../Config/Fire'

export default class Messages extends Component {
    constructor() {
        super()
        this.state = {
            type: Camera.Constants.Type.back,
            msg: '',
            msgArr: [],
            shouldPlay: false,
            recording: false,
            loadEmoji: false,
        }
    }

    async componentDidMount() {
        let uid = await firebase.auth().currentUser.uid
        firebase.database().ref("users/" + uid + "/current").on("value", (data) => {
            firebase.database().ref("users/" + data.val()).on("value", (dat) => {
                this.props.navigation.setParams({
                    name: dat.val().info.name
                });
                this.setState({ uid, opponentID: data.val() })
            })
        })
        await firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).on("child_added", (data) => {
            let msgArr = this.state.msgArr
            msgArr.push(data.val())
            this.setState({ msgArr })
        })
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params.name,
            headerStyle: {
                backgroundColor: 'blue',
                textAlign: "center"
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };

    camera() {
        this.props.navigation.navigate("Camera")
    }

    video() {
        this.props.navigation.navigate("Video")
    }

    async photo() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        })
        const response = await fetch(result.uri);
        const blob = await response.blob();
        let storageRef = firebase.storage().ref().child(`userimages/${blob.name}`)
        storageRef.put(blob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((snapUrl) => {
                    let today = new Date()
                    let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    if (result.type === 'image') {
                        let msgObj = {
                            snapUrl,
                            created,
                            sender: "me",
                            type: 'image',
                        }
                        firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).push(msgObj).then(() => {
                            msgObj.sender = "opponent"
                            firebase.database().ref(`chatRoom/${this.state.opponentID}/${this.state.uid}`).push(msgObj).then(() => {
                                this.props.navigation.navigate("Messages")
                            })
                        })
                    }
                    if (result.type === 'video') {
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
                    }
                })
            })
    }

    async audio() {
        Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            console.log(recording)
        } catch (error) {
            // An error occurred!
        }
    }

    location() {
        this.props.navigation.navigate("Map")
    }

    send() {
        let msg = this.state.msg
        let today = new Date()
        let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let msgObj = {
            msg,
            created,
            sender: "me",
            type: 'message',
        }
        firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).push(msgObj).then(() => {
            msgObj.sender = "opponent"
            firebase.database().ref(`chatRoom/${this.state.opponentID}/${this.state.uid}`).push(msgObj).then(() => {
                this.setState({ msg: '' })
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled>
                    <View style={styles.messages}>
                        <ScrollView>
                            {!!this.state.msgArr && this.state.msgArr.map((e) => {
                                if (e.sender === 'me') {
                                    if (e.type === 'message') {
                                        return <View style={styles.mine} key={Math.random()}><Text>{e.msg}</Text></View>
                                    }
                                    if (e.type === 'image') {
                                        return <Image source={{ uri: e.snapUrl }} style={{ width: 300, height: 300, alignSelf: 'flex-end', borderRadius: 10, marginTop: 20 }} key={e.snapUrl} />
                                    }
                                    if (e.type === 'video') {
                                        return <Video source={{ uri: e.snapUrl }}
                                            key={e.snapUrl}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="cover"
                                            shouldPlay
                                            isLooping
                                            style={{ width: 300, height: 300, alignSelf: 'flex-end', borderRadius: 10, marginTop: 20 }} />
                                    }
                                } else {
                                    if (e.type === 'message') {
                                        return <View style={styles.your}><Text>{e.msg}</Text></View>
                                    } else if (e.type === 'image') {
                                        return <Image source={{ uri: e.snapUrl }} style={{ width: 300, height: 300, alignSelf: 'flex-end', borderRadius: 10, marginTop: 20 }} />
                                    } else if (e.type === 'video') {
                                        return <Video source={{ uri: e.snapUrl }}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="cover"
                                            shouldPlay
                                            isLooping
                                            style={{ width: 300, height: 300, alignSelf: 'flex-end', borderRadius: 10, marginTop: 20 }} />
                                    }
                                }
                            })}
                        </ScrollView>
                        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                            <TouchableOpacity onPress={() => this.video()}><Text><FontAwesome name="video-camera" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.camera()}><Text><AntDesign name="camera" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.audio()}><Text><FontAwesome name="microphone" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.location()}><Text> <Entypo name="location-pin" size={26} /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.photo()}><Text><AntDesign name="picture" size={26} /></Text></TouchableOpacity>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ width: "80%" }}>
                                <TextInput
                                    placeholder='Type message here.. '
                                    value={this.state.msg}
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
        minWidth: '20%',
        maxWidth: '80%',
        height: "auto",
        padding: 10,
        backgroundColor: "#91c3ff",
        color: "black",
        marginTop: 10,
        alignSelf: "flex-end",
        borderRadius: 10,
    },
    your: {
        minWidth: '20%',
        maxWidth: '80%',
        padding: 10,
        height: "auto",
        backgroundColor: "#e6e2da",
        color: "black",
        marginTop: 10,
        alignSelf: "flex-start",
        borderRadius: 10,
    },
});
