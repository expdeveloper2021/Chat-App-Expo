import React, { Component } from 'react';
import { Image, StatusBar, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Login extends Component {

    static navigationOptions = {
        title: 'Log In',
        headerStyle: {
            backgroundColor: '#42f5e6',
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
                    style={{ width: 100, height: 100, alignSelf: "center" }}
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
                <TouchableOpacity style={{ width: "30%", alignSelf: "center", marginTop: 10, height: "auto", padding: 10, borderWidth: 1 }} onPress={this._submit.bind(this)}>
                    <Text style={{ textAlign: "center" }}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, marginTop: 10 }}>Want an Account? &nbsp;
                    <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }} onPress={this.change.bind(this)}>Go to SignUp</Text>
                </Text>
            </View>
        );
    }

    _next = () => {
        this._passwordInput && this._passwordInput.focus();
    };

    _submit = () => {
        alert(`Welcome! Confirmation email has been sent to ${this.state.email}`);
        this.setState({ email: '', password: '' })
        this.props.navigation.navigate("App")
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
