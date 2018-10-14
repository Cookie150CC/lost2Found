import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { CheckBox } from 'react-native-elements';
import {View, Text } from 'react-native';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'app.json',
    };

    constructor(props) {
        super(props);
        this.state = {
          checked: false,
          checked2: false,
          checked3: false,
        };
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
        * content, we just wanted to give you a quick view of your config */
        return (
          <View>
           <Text>version 0.2.1 a</Text>
            <CheckBox
            title = "Notifications"
            onPress={() => this.setState({
                checked: !this.state.checked
            })}
            checked={this.state.checked}
            />
            <CheckBox
            title = "Sound"
            onPress={() => this.setState({
                checked2: !this.state.checked2
            })}
            checked={this.state.checked2}
            />
            <CheckBox
            title = "Location"
            onPress={() => this.setState({
                checked3: !this.state.checked3
            })}
            checked={this.state.checked3}
            />
            </View>

        );
    }
}
