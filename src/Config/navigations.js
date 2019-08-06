
import { createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../index';

const AuthNavigator = createStackNavigator({
    Login: {
        screen: Routes.Login
    },
    SignUp: {
        screen: Routes.SignUp,
    },
});


const TabNavigator = createMaterialTopTabNavigator(
    {
        Users: { screen: Routes.All },
        Status: { screen: Routes.Status },
    },
    {
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: '#42f5e6',

            },
        },
    },
)

const HomeNavigator = createStackNavigator({
    Home: {
        screen: TabNavigator,
        navigationOptions: {
            title: 'Messenger',
            headerStyle: {
                backgroundColor: '#42f5e6',
                height: 60
            },
            headerTintColor: 'black',
        },
    },
    Messages: {
        screen: Routes.Messages
    },
    Camera: {
        screen: Routes.Camera
    },
    Video: {
        screen: Routes.Video
    },
    Map: {
        screen: Routes.Map
    },
    StatusCamera: {
        screen: Routes.StatusCamera
    }
});

// const AppNavigator = createDrawerNavigator({
//     'All Users': {
//         screen: TabNavigator
//     },
//     // Profile: {
//     //     screen: Routes.Profile
//     // }
// }, {});

const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: HomeNavigator
    },
});

export default createAppContainer(MainNavigator);
