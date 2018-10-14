import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Alert,
    AppRegistry,
    TextInput,
} from 'react-native';
import { WebBrowser,
    MapView,
    Constants,
    Location,
    Permissions,
    Camera,
    ImagePicker
} from 'expo';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';

import { MonoText } from '../components/StyledText';

const scaleAnimation = new ScaleAnimation();

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        name: "",
        desc: "",
        location: null,
        errorMessage: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        dialogShow: false,
    };
    // constructor(props) {
    // super(props)
    //   this.state = {
    //     uri: 'http://lorempixel.com/output/cats-h-c-320-640-1.jpg'
    //   }
    //   // this._setImage = this._setImage.bind(this)
    //   this._selectPicture = this._selectPicture.bind(this)
    //   this._takePicture = this._takePicture.bind(this)
    // }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
            this._getCameraAsync();
        }
    }

    showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    _getCameraAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        this.setState({ hasCameraPermission: status === 'granted' });
    };

    async takePicture() {
        //   console.log(this.camera);
        const result = await ImagePicker.launchCameraAsync()
    };

    render() {
        let lat = 0;
        if (this.state.location) {
            lat = this.state.location.coords.latitude;
        }
        let long = 0;
        if (this.state.location) {
            long = this.state.location.coords.longitude;
        }
        const { hasCameraPermission } = this.state;

        return (
            <View style={styles.container}>
            <MapView
            style={{ flex: 1}}
            provider="google"
            region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: .005,
                longitudeDelta: .002
            }}
            />


            <View style={{ flexDirection: 'row', alignItems: 'center',
            justifyContent: 'center'}}>
            <Camera ref={ref => { this.camera = ref; }} />
            <View style={{backgroundColor: "green",flex: 1}} >
            <Button
            onPress={this._onPressFoundButton}
            title="Found"
            color="#e8e8e8"
            />
            </View>
            <View style={{backgroundColor: "red",flex: 1}} >
            <Button
            onPress={this.showScaleAnimationDialog}
            title="Lost"
            color="#e8e8e8"
            />
            </View>
            </View>
            <View style={styles.buttonContainer}>

            </View>

            <PopupDialog
              ref={(popupDialog) => {
                this.scaleAnimationDialog = popupDialog;
              }}
              dialogAnimation={scaleAnimation}
              dialogTitle={<DialogTitle title="Loss Report" />}
              actions={[
                <DialogButton
                  text="Dismiss"
                  onPress={() => {
                    this.scaleAnimationDialog.dismiss();
                  }}
                  key="button-1"
                />,<DialogButton
                  text="Submit"
                  onPress={() => {
                    this.addToDB(this.state.name, this.state.desc);
                  }}
                  key="button-2"
                />,
              ]}
            >  <View>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                placeholder="Item Name"
              />
              </View>
              <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
              onChangeText={(desc) => this.setState({desc})}
              value={this.state.desc}
              placeholder="Item Description(ex. Color)"
              />
              </View></PopupDialog>
            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                Development mode is enabled, your app will be slower but you can use useful development
                tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };

    addToDB(n, d){
      alert("added to db");
      this.scaleAnimationDialog.dismiss();
    }

    _onPressButton = () => {
        Alert.alert('You tapped the button!');
    };

    _onPressFoundButton = () => {
      this.takePicture();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
