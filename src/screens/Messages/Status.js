import React, { Component } from 'react'
import { Image, View, TouchableOpacity, Text } from 'react-native'
import folder from '../../Images/user.png'
import { List } from 'react-native-paper';
import firebase from '../../Config/Fire'

export class Status extends Component {
    constructor() {
        super()
        this.state = {
            statuses: []
        }
    }

    async componentDidMount() {
        let uid = await firebase.auth().currentUser.uid
        firebase.database().ref(`users/${uid}/info`).on("value", (data) => {
            let dat = data.val()
            let name = dat.name
            let uids = dat.uid
            let userObj = {
                name,
                uids
            }
            firebase.database().ref(`stories/${uid}/info`).set(userObj)
        })
        firebase.database().ref("stories").on("child_added", (data) => {
            let a = Object.entries(data.val())
            if (a.length > 1) {
                if (a[1][1].uids !== uid) {
                    let statuses = this.state.statuses
                    statuses.push(a)
                    this.setState({ statuses, uid })
                }
            }
        })
    }

    open() {
        this.props.navigation.navigate("StatusCamera")
    }

    carous(i) {
        firebase.database().ref(`users/${this.state.uid}/status`).set(i)
        this.props.navigation.navigate("Carousel")
    }

    render() {
        return (
            <View style={{ flex: 1, borderWidth: 1 }}>
                <View style={{ flex: 0.15, borderBottomWidth: 1, justifyContent: 'center', borderColor: 'gray' }}>
                    <TouchableOpacity onPress={this.open.bind(this)}>
                        <List.Item
                            title="My status"
                            description="Tap to see status update"
                            left={props => <Image {...props} source={folder} style={{ width: 50, height: 50, alignSelf: "center" }} />}
                            titleStyle={{ fontWeight: 'bold' }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.07, backgroundColor: 'gray', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'white', marginLeft: 10 }}>All Status</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'aqua' }}>
                    {!!this.state.statuses.length && this.state.statuses.map((e) => {
                        return <TouchableOpacity style={{ backgroundColor: '#4484eb', marginTop: 10 }} onPress={this.carous.bind(this, e[1][1].uids)} key={Math.random()}>
                            <List.Item
                                title={e[1][1].name}
                                left={props => <Image {...props} source={folder} style={{ width: 50, height: 50, alignSelf: "center" }} />}
                            />
                        </TouchableOpacity>
                    })}
                </View>
            </View >
        )
    }
}

export default Status
