import React, { Component } from 'react';
import { Image, StatusBar, TextInput, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import firebase, { login } from '../../Config/Fire'
import * as Facebook from 'expo-facebook';

export default class Login extends Component {

    static navigationOptions = {
        title: 'Log In',
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
        email: '',
        password: '',
    };

    change() {
        this.props.navigation.navigate("SignUp")
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image
                    style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 20 }}
                    source={{ uri: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png' }}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    ref={ref => { this._emailInput = ref }}
                    placeholder="email@example.com"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={this._next}
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
                <TouchableOpacity style={{ width: "30%", alignSelf: 'center', marginTop: 15, height: "auto", padding: 10, borderWidth: 2, borderColor: 'blue', borderRadius: 10, backgroundColor: 'white' }} onPress={this._submit.bind(this)}>
                    <Text style={{ textAlign: "center" }}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, marginTop: 10 }}>Want an Account? &nbsp;
                    <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }} onPress={this.change.bind(this)}>Go to Sign Up</Text>
                </Text>
                <TouchableOpacity style={{ width: "50%", alignSelf: 'center', marginTop: 15, height: "auto", padding: 10, borderWidth: 2, borderColor: 'blue', borderRadius: 10, backgroundColor: 'white' }} onPress={this.loginWithFacebook.bind(this)}>
                    <Text style={{ textAlign: "center" }}>Login with Facebook</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _next = () => {
        this._passwordInput && this._passwordInput.focus();
    };

    _submit = () => {
        const { email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((success) => {
                Alert.alert(
                    'Nice Job',
                    'Login Successfully',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log("Cancel Pressed"),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => this.props.navigation.navigate("Home") },
                    ],
                    { cancelable: true }
                );
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

    loginWithFacebook = async () => {
        const {
            type,
            token,
        } = await Facebook.logInWithReadPermissionsAsync('475325173025054', {
            permissions: ['public_profile'],
        })

        if (type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const res = await response.json();
            try {
                const user = await login(token);
                let uid = user.user.uid
                let name = res.name
                let userObj = {
                    uid,
                    name
                }
                firebase.database().ref("users/" + uid + "/info").set(userObj).then(() => {
                    Alert.alert(
                        'Nice Job',
                        'Login Successfully',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log("Cancel Pressed"),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => this.props.navigation.navigate("Home") },
                        ],
                        { cancelable: true }
                    );
                }).catch(() => {
                    console.log("Database undefined")
                })
            } catch (e) {
                console.log('e ===>', e)
            }
        } else {
            // type === 'cancel'
        }
    }
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
