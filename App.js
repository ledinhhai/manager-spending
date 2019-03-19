import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import HomeScreen from './screens/HomeScreen';
import TabsScreen from './screens/TabsScreen';
import LoginScreen from './screens/LoginScreen';
import { createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { store } from './store';
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCvb0IDLEyRVIztVhVvHR7kQVt3pj55t-w",
  authDomain: "manage-spending.firebaseapp.com",
  databaseURL: "https://manage-spending.firebaseio.com",
  projectId: "manage-spending",
  storageBucket: "manage-spending.appspot.com",
  messagingSenderId: "132199761220"
};
firebase.initializeApp(config);



export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    signedIn: false,
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ signedIn: true });
      }
    })
  }

  createRootNavigator(signedIn = false){
    return createSwitchNavigator({
      Dashboard: {
        screen: TabsScreen
      },
      Login: {
        screen: LoginScreen
      },
    }, {
        navigationOptions: ({ navigation }) => ({ header: false }),
        initialRouteName: signedIn ? "Dashboard" : "Login"
      });
  };
  render() {
    const { isLoadingComplete, signedIn } = this.state;
    if (!isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {this.createRootNavigator(signedIn)}
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/splash.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
