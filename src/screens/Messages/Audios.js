import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { Audio } from 'expo-av';
import { Button } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import firebase from '../../Config/Fire'


export class Audios extends Component {
    constructor() {
        super()
        this.state = {
            text: 'Start',
            minutes: 0,
            second: 0,
            timer: '',
            loader: false,
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
    }

    async audio() {
        Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({ text: 'Stop' })
        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync()
            this.setState({ recording, isLoad: false })
            let timer = setInterval(() => {
                if (this.state.second === 59) {
                    this.setState({ second: 0, minutes: this.state.minutes + 1 })
                } else {
                    this.setState({ second: this.state.second + 1 })
                }
            }, 1000);
            this.setState({ timer })
        }
        catch (e) {
            console.log(e)
        }
    }

    async stop() {
        const { recording } = this.state
        clearInterval(this.state.timer)
        this.setState({ minutes: 0, second: 0, loader: true })
        await recording.stopAndUnloadAsync()
        let URL = recording._uri
        const response = await fetch(URL);
        const blob = await response.blob();
        let storageRef = firebase.storage().ref().child(`userAudio/${blob._data.name}`)
        storageRef.put(blob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((snapUrl) => {
                    let today = new Date()
                    let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    let msgObj = {
                        snapUrl,
                        created,
                        sender: "me",
                        type: 'audio',
                    }
                    firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).push(msgObj).then(() => {
                        msgObj.sender = "opponent"
                        firebase.database().ref(`chatRoom/${this.state.opponentID}/${this.state.uid}`).push(msgObj).then(() => {
                            this.setState({ recording: '' })
                            this.props.navigation.goBack()
                        })
                    })
                })
            })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.state.loader ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} /> : <>
                    <Text>{this.state.minutes} : {this.state.second}</Text>
                    <Button style={{ borderWidth: 1, borderColor: 'black', padding: 7, marginTop: 10 }}
                        onPress={this.state.text === 'Start' ? () => this.audio() : () => this.stop()}
                    >{this.state.text}</Button>
                </>}
            </View>
        )
    }
}

export default Audios
