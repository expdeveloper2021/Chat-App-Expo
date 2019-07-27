
import { createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../index';

const AuthNavigator = createStackNavigator({
    SignUp: {
        screen: Routes.SignUp,
    },
    Login: {
        screen: Routes.Login
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
    App: {
        screen: HomeNavigator
    },
    Auth: {
        screen: AuthNavigator
    },
});

export default createAppContainer(MainNavigator);
