import React, { Component } from 'react';
import { Image, StatusBar, TextInput, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import firebase from '../../Config/Fire'

export default class App extends Component {
    static navigationOptions = {
        title: 'Sign Up',
        headerStyle: {
            backgroundColor: '#42f5e6',
            height: 60
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        name: '',
        email: '',
    };

    change() {
        this.props.navigation.navigate("Login")
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image
                    style={{ width: 100, height: 100, alignSelf: "center" }}
                    source={{ uri: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png' }}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    ref={ref => { this._nameInput = ref }}
                    placeholder="Full Name"
                    autoFocus={true}
                    autoCapitalize="words"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    ref={ref => { this._emailInput = ref }}
                    placeholder="email@example.com"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={this._next2}
                    blurOnSubmit={true}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    ref={ref => { this._passwordInput = ref }}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="send"
                    onSubmitEditing={this._submit.bind(this)}
                    blurOnSubmit={true}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={{  width: "30%", alignSelf: 'center', marginTop: 15, height: "auto", padding: 10, borderWidth: 2, borderColor: 'blue', borderRadius: 10, backgroundColor: 'white' }} onPress={this._submit.bind(this)}>
                    <Text style={{ textAlign: "center" }}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, marginTop: 10 }}>Have an Account? &nbsp;
                    <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }} onPress={this.change.bind(this)}>Go to LogIn</Text>
                </Text>
            </View>
        );
    }

    _next = () => {
        this._emailInput && this._emailInput.focus();
    };

    _next2 = () => {
        this._passwordInput && this._passwordInput.focus();
    };

    _submit = () => {
        const { name, email, password } = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((success) => {
                let uid = success.user.uid
                let userObj = {
                    name,
                    email,
                    password,
                    uid,
                }
                this.setState({ name: '', email: '', password: '' })
                firebase.database().ref("users/" + success.user.uid + "/info").set(userObj).then(() => {
                    Alert.alert(
                        'Nice Job',
                        'Please login to continue',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log("Cancel Pressed"),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => this.props.navigation.navigate("Login") },
                        ],
                        { cancelable: true }
                    );
                }).catch(() => {
                    console.log("Database undefined")
                })
            })
            .catch((error) => {
                var errorMessage = error.message;
                Alert.alert(
                    'Sorry',
                    errorMessage,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true }
                );
            });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5e8069',
        justifyContent: "center",
    },
    input: {
        margin: 20,
        marginBottom: 0,
        paddingHorizontal: 10,
        borderRadius: 4,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        padding: 10,
    },
});
