import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, } from 'react-native'
import { TextInput } from 'react-native-paper';

export default class Messages extends Component {
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
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView>
                    <View style={styles.messages}>
                        <ScrollView>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                            <View style={styles.your}><Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text></View>
                            <View style={styles.mine}><Text>lorem ipsum doler emit</Text></View>
                        </ScrollView>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Message"
                            autoCapitalize="words"
                            autoCorrect={true}
                            keyboardType="default"
                            returnKeyType="send"
                            onSubmitEditing={this._next}
                            blurOnSubmit={false}
                        />
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
        borderWidth: 1,
        margin: 20,
    },
    mine: {
        width: "70%",
        height: "auto",
        padding: 10,
        backgroundColor: "#058bf2",
        color: "black",
        marginTop: 10,
        alignSelf: "flex-end",
        borderRadius: 10,
    },
    your: {
        width: "70%",
        padding: 10,
        height: "auto",
        backgroundColor: "#e6e2da",
        color: "black",
        marginTop: 10,
        alignSelf: "flex-start",
        borderRadius: 10,
    },
    input: {
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 10
    },
});
