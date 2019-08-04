import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native'
import { Appbar, List } from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import folder from '../../Images/user.png'
import firebase from '../../Config/Fire'

export default class All extends Component {

    constructor() {
        super()
        this.state = {
            arr: [],
            come: false,
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

    static navigationOptions = {
        header: null,
    };

    clicked(userID) {
        firebase.database().ref("users/" + this.state.uid + "/current").set(userID).then(() => {
            this.props.navigation.navigate("Messages")
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header dark={true} style={styles.header}>
                    <Image
                        style={{ width: 40, height: 40, marginLeft: 5 }}
                        source={{ uri: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png' }}
                    />
                    <Appbar.Content style={{ marginLeft: -3 }}
                        title="Messenger"
                    />
                </Appbar.Header>

                <ScrollView>
                    <TextInput style={{ borderWidth: 1, marginTop: 20, padding: 10, width: "90%", alignSelf: "center", borderRadius: 20, paddingLeft: 20 }} placeholder="Search for Users" placeholderTextColor="blue" />
                    {!this.state.come ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 30 }} /> :
                        this.state.arr.map((e) => {
                            return <TouchableOpacity onPress={this.clicked.bind(this, e.uid)} key={e.uid} >
                                <List.Item
                                    title={e.name}
                                    description= "Last Message"
                                    style={{ marginTop: 30 }}
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
