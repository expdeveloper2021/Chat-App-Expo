import React, { Component } from 'react';
import { Image, StatusBar, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

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
                <TouchableOpacity style={{ width: "30%", alignSelf: "center", marginTop: 10, height: "auto", padding: 10, borderWidth: 1 }} onPress={this._submit.bind(this)}>
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
        alert(`Welcome, ${this.state.name}! Confirmation email has been sent to ${this.state.email}`);
        this.setState({ name: '', email: '', password: '' })
        this._nameInput.focus()
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
