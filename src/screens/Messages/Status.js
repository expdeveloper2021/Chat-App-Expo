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
        firebase.database().ref("stories").on("value", (data) => {
            if (data.val() !== null) {
                let a = Object.entries(data.val())
                for (let i = 0; i < a.length; i++) {
                    if (a[i][0] !== uid) {
                        let statuses = this.state.statuses
                        statuses = a
                        this.setState({ statuses })
                    }
                }
            }
        })
    }

    open() {
        this.props.navigation.navigate("StatusCamera")
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
                    
                </View>
            </View >
        )
    }
}

export default Status
