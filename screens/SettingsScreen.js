import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { CheckBox } from 'react-native-elements';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'app.json',
    };

    constructor(props) {
        super(props);
        this.state = { checked: false };
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
        * content, we just wanted to give you a quick view of your config */
        return (

            <CheckBox
            onPress={() => this.setState({
                checked: !this.state.checked
            })}
            checked={this.state.checked}
            />


        );
    }
}
