import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Appbar, List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class All extends Component {
    static navigationOptions = {
        header: null,
    };
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
                    {/* <Appbar.Action icon="search" onPress={this._onSearch} />
                    <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
                </Appbar.Header>
                <Text style={{fontSize: 30 , alignSelf: "center" , fontWeight: "bold" , marginTop: 10 , textDecorationLine: "underline"}}>All Users</Text>
                <List.Item
                    title="Fahim Memon"
                    description="Last Message"
                    style={{ borderWidth: 1, marginTop: 30 }}
                    right={props => <TouchableOpacity {...props} style={{ marginTop: 10}}
                        onPress={() => this.props.navigation.navigate("Messages")}
                    >
                        <Image
                            style={{ width: 30, height: 30, }}
                            source={{ uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/group-chat-5-751639.png' }}
                        />
                    </TouchableOpacity>}
                />
                <List.Item
                    title="Faizan Memon"
                    description="Last Message"
                    style={{ borderWidth: 1, marginTop: 3 }}
                    right={props => <TouchableOpacity {...props} style={{ marginTop: 10}}
                        onPress={() => this.props.navigation.navigate("Messages")}
                    >
                        <Image
                            style={{ width: 30, height: 30, alignSelf: "center" }}
                            source={{ uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/group-chat-5-751639.png' }}
                        />
                    </TouchableOpacity>
                    }
                />
                <List.Item
                    title="Tahir Memon"
                    description="Last Message"
                    style={{ borderWidth: 1, marginTop: 3 }}
                    right={props => <TouchableOpacity {...props} style={{ marginTop: 10}}
                        onPress={() => this.props.navigation.navigate("Messages")}
                    >
                        <Image
                            style={{ width: 30, height: 30, alignSelf: "center" }}
                            source={{ uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/group-chat-5-751639.png' }}
                        />
                    </TouchableOpacity>}
                />
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
