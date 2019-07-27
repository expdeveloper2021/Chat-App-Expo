import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Appbar } from 'react-native-paper';

export default class Messages extends Component {
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
