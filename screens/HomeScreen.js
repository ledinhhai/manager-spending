import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Button,
  Text,
  Thumbnail,
} from 'native-base';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(this.props.navigation);
        this.props.navigation.navigate('Dashboard')
      }
    }) 
  }
  render() {
    return (
      <Container style={styles.container}>
        <Thumbnail style={styles.logo} source={require('../assets/images/splash.png')} />
        <Button full rounded primary style={styles.btn} onPress={() => this.props.navigation.navigate('Login')}>
          <Text> Login </Text>
        </Button>
        <Button full rounded primary style={styles.btn}>
          <Text> Sign Up </Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  logo: {
    height: 200,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto"
  },
  btn: {
    marginVertical: 10,
    marginHorizontal: 10,
    height: 50,
    fontSize: 16
  }
});
