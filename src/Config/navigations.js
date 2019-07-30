
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


const HomeNavigator = createStackNavigator({
    Home: {
        screen: Routes.All
    },
    Messages: {
        screen: Routes.Messages
    },
});

// const TabNavigator = createMaterialTopTabNavigator({
//     Users: {
//         screen: Routes.All
//     },
//     Messages: {
//         screen: Routes.Messages
//     }
// })

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
