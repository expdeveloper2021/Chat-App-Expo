import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native'
import { List } from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import folder from '../../Images/user.png'
import firebase from '../../Config/Fire'

export default class All extends Component {

    constructor() {
        super()
        this.state = {
            arr: [],
            come: false,
            arre: []
        }
    }

    componentDidMount() {
        let uid = firebase.auth().currentUser.uid
        firebase.database().ref("users").on("child_added", (data) => {
            setTimeout(() => {
                let arr = this.state.arr
                if (data.val().info.uid !== uid) {
                    arr.push(data.val().info)
                }
                this.setState({ arr, uid, come: true })
            }, 2000);
        })
    }

    clicked(userID) {
        firebase.database().ref("users/" + this.state.uid + "/current").set(userID).then(() => {
            this.props.navigation.navigate("Messages")
        })
    }

    search(e) {
        let arre = this.state.arr.filter((f) => {
            return f.name.includes(e)
        })
        this.setState({ arre })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput style={{ borderWidth: 1, marginTop: 20, marginBottom: 20, padding: 10, width: "90%", alignSelf: "center", borderRadius: 20, paddingLeft: 20 }} placeholder="Search for Users" placeholderTextColor="blue" onChangeText={this.search.bind(this)} />
                    {!this.state.come ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} /> :
                        !this.state.arre.length ? this.state.arr.map((e) => {
                            return <TouchableOpacity onPress={this.clicked.bind(this, e.uid)} key={e.uid} >
                                <List.Item
                                    title={e.name}
                                    description="Last Message"
                                    left={props => <Image {...props} source={folder} style={{ width: 50, height: 50, alignSelf: "center" }} />}
                                />
                            </TouchableOpacity>
                        }) : this.state.arre.map((e) => {
                            return <TouchableOpacity onPress={this.clicked.bind(this, e.uid)} key={e.uid} >
                                <List.Item
                                    title={e.name}
                                    description="Last Message"
                                    left={props => <Image {...props} source={folder} style={{ width: 50, height: 50, alignSelf: "center" }} />}
                                />
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
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
    header: {
        backgroundColor: '#185dcc'
    }
});
