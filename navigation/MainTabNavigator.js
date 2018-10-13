import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import StatusScreen from '../screens/StatusScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={
            Platform.OS === 'ios'
            ? `ios-home${focused ? '' : '-outline'}`
            : 'md-home'
        }
        />
    ),
};

const StatusStack = createStackNavigator({
    Status: StatusScreen,
});

StatusStack.navigationOptions = {
    tabBarLabel: 'Status',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-compass${focused ? '' : '-outline'}` : 'md-compass'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});


SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    StatusStack,
    SettingsStack,
});
